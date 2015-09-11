var Twit = require("twit");

// Include your access information below
var Bot = new Twit({

});

var stream = Bot.stream('statuses/filter', { track: '#nodejs', language: 'en' });
var ids = [];

stream.on('tweet', function (tweet) {
  console.log(tweet['id_str']);
  ids.push(tweet['id_str']);
  console.log(ids.length);
});

setInterval(function(){
  ids.map(String);
  var randomTweet = Math.floor(Math.random() * ids.length) + 1;
  var tweets = ids[randomTweet];
  console.log(tweets);

  Bot.post('statuses/retweet/:id', { id: tweets }, function (err, data, response) {
  console.log(data);
  });

  while(ids.length > 0) {
    ids.pop();
  }

}, 18000000);
