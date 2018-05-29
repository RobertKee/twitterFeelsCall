var express = require('express');
var router = express.Router();
var app = express()
var Twitter = require('twitter-node-client').Twitter
var twitter = new Twitter();
var config = require('../config')
var _ = require('lodash')

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
var atlantaArr = [];
/* GET home page. */
router.get('/', function (req, res, next) {

  // console.log(config)

  var dist = `120mi`
  
  var locs = [
    [43.615852, -116.282355], // idaho gps
    [48.785569, -122.47977], // washington state
    [44.441371, -73.118691], // vt thd
    [25.763267, -80.243685], // miami
    [32.752141, -117.213786], // san diego
    [34.0521947, -84.598989], // experimental store
  ]
  

for (var i = 0; i < locs.length; i++) {

  var lat = locs[i][0]
  var long = locs[i][1]
  // console.log("twitter obj: ", twitter)
  var tweets = []
  const results = new Promise((resolve, reject)=>{
    twitter.getSearch({ 'q': 'homedepot', 'count': 100, lat, long, dist }, error, (data) => {
      const array = JSON.parse(data).statuses.map((data, index) => {
        tweets.push(data.text)
      })
      if(tweets.length === 0){
        reject("piss off");
      }else{
        resolve(tweets)
      }
    })
  })
  // console.log(tweets)
  var inspect = require('unist-util-inspect');
  var unified = require('unified');
  var english = require('retext-english');
  var sentiment = require('retext-sentiment'); var processor = unified()
    .use(english)
    .use(sentiment);
  // const example = ["I hate forgetting to bring a book somewhere I definitely should have brought a book to", "This product is not bad at all", "Hai sexy"]
  // var tester = "I am a test"
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

results.then((tweets)=>{
    var avg = 0
    tweets.forEach(function (s) {
      const tree = processor.parse(s);
      processor.run(tree);
      const sentenceNode = tree.children[0].data
      avg += tree.children[0].data.polarity
      atlantaArr.push(sentenceNode)
      // console.log(tree.children[0].data)
    })
    avg /= tweets.length
    // console.log("average rating: ", avg)
    atlantaArr.push(avg)
    console.log("INSIDE LENGTH", atlantaArr.length)
  })
}
console.log("OUTSIDE LENGTH",atlantaArr.length)
// const toPush = new Promise((resolve, reject)=>{
//   if (atlantaArr === undefined){
//     reject("no good")
//   }
//   else{
//     resolve(atlantaArr)
//   }
// })
// toPush.then((atlantaArr)=> {
//   console.log("heeeere",atlantaArr)
//   res.json(atlantaArr)
// })
  // Promise.all(atlantaArr).then((resovle, reject)=>{

  // })


  // Message Input
  res.render('index', { title: 'Express' });
});

module.exports = router;


