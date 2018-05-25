var express = require('express');
var router = express.Router();
var app = express()
var Twitter = require('twitter-node-client').Twitter
var twitter = new Twitter();
var config = require('../config')

//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
  console.log("body: ",body)
  // console.log("response",response)
};
var success = function (data) {
  return data;
  // console.log(JSON.parse(data));
};

/* GET home page. */
router.get('/', function(req, res, next) {

  twitter.accessToken = config.accessToken
  twitter.accessTokenSecret = config.accessTokenSecret
  twitter.consumerKey = config.consumerKey
  twitter.consumerSecret = config.consumerSecret

  var long = `34.0521947`
  var lat = `-84.59898900000002`
  var dist = `100mi`

  var tweets = []

  // console.log(`this should be on the page`)
  // const results = twitter.getSearch({'q':'%40homedepot%20OR%20%23homedepot'},error,success)
  // const results = twitter.getSearch({'q':'homedepot','geocode':[long,lat,dist]},error,(data)=>{
  const results = twitter.getCustomApiCall(`/search/tweets.json?q=homedepot&geocode=${long},${lat},${dist}&count=100`,error,success,(data)=>{

    const array = JSON.parse(data).statuses.map((data, index)=>{
      // console.log(data.id);
      // console.log(data.text);
      tweets.push(data.text)
      console.log("This many tweets: ", tweets.length)
    })
  })

  res.render('index', { title: 'Express' });

  // res.push()
});

module.exports = router;
