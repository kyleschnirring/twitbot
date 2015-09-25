var Twit = require("twit");

// Include your access information below
var Bot = new Twit({

});

var streamIt = setInterval(function () {
  var stream = Bot.stream('statuses/filter', { track: '#nodejs', language: 'en' });
  var ids = [];
  var followers = [];
  var friends = [];

  Bot.get('followers/ids', { screen_name: 'Kschnirring' },  function (error, data, response) {
    if (error) {
      console.log(error);
    } else {
      followers = data;
      console.log(followers);
    }
  });

  Bot.get('friends/ids', { screen_name: 'Kschnirring' },  function (error, data, response) {
    if (error){
      console.log(error);
    } else {
      friends = data;
      console.log(friends);
    }
  });

  stream.on('tweet', function (tweet) {
    console.log(tweet['id_str']);
    ids.push(tweet['id_str']);
    console.log(ids.length);

  });

  setInterval(function () {
    ids.map(String);
    var randomTweet = Math.floor(Math.random() * ids.length) + 1;
    var tweets = ids[randomTweet];
    console.log(tweets);

    Bot.post('statuses/retweet/:id', { id: tweets }, function (error, data, response) {
      console.log(data);
    });

    while (ids.length > 0) {
      ids.pop();
    }
    clearInterval(streamIt);
  }, 144000);
}, 108000);//3 hours


