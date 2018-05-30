var express = require('express');
var router = express.Router();
var app = express();
var Twitter = require('twitter-node-client').Twitter
var twitter = new Twitter();
var config = require('../config');
var _ = require('lodash');
var avgArray = [];

//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
  console.log("body: ", body)
  // console.log("response",response)
};
var success = function (data) {
  return data;
  // console.log(JSON.parse(data));
};

/* GET home page. */
router.get('/', function (req, res, next) {

  // console.log(config)
  var atlantaArr = [];
  var avgArray = [];
  var dist = `120mi`;

  var locs = [
    [43.615852, -116.282355], // idaho gps
    [48.785569, -122.47977], // washington state
    [44.441371, -73.118691], // vt thd
    [25.763267, -80.243685], // miami
    [32.752141, -117.213786], // san diego
    [34.0521947, -84.598989], // experimental store
  ];

  
  const results = locs.map((locData, i) => {
    return new Promise((resolve, reject) => {
      var lat = locs[i][0];
      var long = locs[i][1];
      // console.log("twitter obj: ", twitter)
      var tweets = [];
      twitter.getSearch({ 'q': 'homedepot', 'count': 100, 'geocode': `${lat},${long},${dist}`}, error, (data) => {
        const array = JSON.parse(data).statuses.map((data, index) => {
          tweets.push(data.text)
        });
        if (tweets.length === 0) {
          reject("there are no tweets");
        } else {
          resolve(tweets)
        }
      })
    });
  });

  // console.log(tweets)
  const inspect = require('unist-util-inspect');
  const unified = require('unified');
  const english = require('retext-english');
  const sentiment = require('retext-sentiment');
  // const example = ["I hate forgetting to bring a book somewhere I definitely should have brought a book to", "This product is not bad at all", "Hai sexy"]
  // var tester = "I am a test"
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

  Promise.all(results).then((sixLocTweets) => {
    var processor = unified()
      .use(english)
      .use(sentiment);

    let tweetArray = [];
    var avg = 0
    // console.log(sixLocTweets)
    for (var j = 0; j < sixLocTweets.length; j++) {
      avg = 0;
      sixLocTweets[j].forEach(function (s, i) {
        // console.log(`I have run ${i} times`);
        // console.log(s)
        const tree = processor.parse(s);
        processor.run(tree);
        // console.log(tree)

        if (tree.children[0]) {
          const sentenceNode = tree.children[0].data;
          avg += tree.children[0].data.polarity;
          tweetArray.push(sentenceNode)
        }

        // // console.log(tree.children[0].data)
        // console.log(tweetArray.length)

        // console.log("INSIDE LENGTH", tweetArray.length)
        // console.log(tweetArray)
      });

      avg /= sixLocTweets[j].length;
      avgArray.push(locs[j],avg);
      console.log("I am the avg array: ",avgArray);
      // console.log(locs[j])
    }
    res.json({twetArray, avgArray})
  });

  // console.log(tweetsPromises);
  // Promise.all(tweetsPromises).then((noWayThisWorkedData)=>{
  //   console.log("Data is back.");
  // })



  // ***** return some promises?
  // tweets.map((s)=>{
  //   return new Promise((resolve, reject)=>{

  //   })
  // })

  //  **** trying to get the varible in scope
  // results.then((atlantaArr)=>{
  //   const thing = atlantaArr
  // })





  // Message Input
  // res.render('index', { title: 'Express' });
    router.get("/data", function (req, res, next) {
        // console.log("here go", crap.length)
        res.json(avgArray)
    });

});


module.exports = router;
