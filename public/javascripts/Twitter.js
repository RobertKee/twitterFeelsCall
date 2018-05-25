var Twitter = NodeRequire('twitter-node-client').Twitter;

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var twitter = new Twitter();

const results = twitter.getSearch({'q':'%40homedepot OR %23homedepot'},error,success)

console.log(results)

module.exports = "Twitter"