var Twit = require("twit");

// Include your access information below
var Bot = new Twit({
   consumer_key:         'LEU21rEE7t8AoT6FrgATpgUi7'
  , consumer_secret:      '7ghVxQnxqcyzsOn0XLTdXoi4qYHBh8MFEsTftzpAzyt4lZG38V'
  , access_token:         '159317043-fMrDMCbVsFy2LmVf9DAUJC6y5RaxnIPHdM7cK3je'
  , access_token_secret:  'RCE4szrLjOiJ0uTKbbqPUZYNXytfnvIEgsRNEGicPafRX'

});

var streamIt = setInterval(function () {
  var stream = Bot.stream('statuses/filter', { track: '#nodejs', language: 'en' });
  var tweetids = [];

  stream.on('tweet', function (tweet) {
    console.log(tweet['id_str']);
    tweetids.push(tweet['id_str']);
    console.log(tweetids.length);

  });

  setInterval(function () {
    tweetids.map(String);
    var randomTweet = Math.floor(Math.random() * tweetids.length) + 1;
    var tweets = tweetids[randomTweet];
    var counter = 0;
    var friendAndFollower = [];
    console.log(tweets);

    Bot.post('statuses/retweet/:id', { id: tweets }, function (error, data, response) {
      console.log(data);
    });

    while (tweetids.length > 0) {
      tweetids.pop();
    }
    clearInterval(streamIt);
  }, 144000);
}, 108000);


