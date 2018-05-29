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

/* GET home page. */
router.get('/', function (req, res, next) {

  // console.log(config)

  // twitter.accessToken = config.accessToken
  // twitter.accessTokenSecret = config.accessTokenSecret
  // twitter.consumerKey = config.consumerKey
  // twitter.consumerSecret = config.consumerSecret

  var long = `34.0521947`
  var lat = `-84.59898900000002`
  var dist = `120mi`
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
  var atlantaArr = [];
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

results.then((tweets)=>{
  // _.forEach(tweets,function(s) {
  //   console.log("test: ", s)

    tweets.forEach(function (s) {
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      // atlantaArr.push("i am temp text")
      const tree = processor.parse(s);
      processor.run(tree);
      const sentenceNode = tree.children[0].data
      atlantaArr.push(sentenceNode)
      console.log(atlantaArr)
    })
  })

  

  // console.log(atlantaArr);

  // Message Input
  res.render('index', { title: 'Express' });
});

module.exports = router;
