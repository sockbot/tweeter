"use strict";

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const MAX_TWEET_LENGTH = 140;

  // calculates the amount of time passed since timestamp (in milliseconds) and returns a string in human-readable format
  // TODO: improve function to handle plural and singular better, handle leap years and DST/PST edge cases, use library?
  const timePassed = function(timestamp) {
    const timeNow = Date.now();
    const millsPassed = timeNow - timestamp;
    const secondsPassed = millsPassed / 1000;
    const minutesPassed = secondsPassed / 60;
    const hoursPassed = minutesPassed / 60;
    const daysPassed = hoursPassed / 24;

    if (daysPassed >= 180) {
      return "180+ days ago";
    }
    if (2 <= daysPassed && daysPassed < 180) {
      return `${Math.round(daysPassed)} days ago`;
    }
    if (2 <= hoursPassed && daysPassed < 2) {
      return `${Math.round(hoursPassed)} hours ago`;
    }
    if (2 <= minutesPassed && hoursPassed < 2) {
      return `${Math.round(minutesPassed)} minutes ago`;
    }
    if (2 <= secondsPassed && minutesPassed < 2) {
      return `${Math.round(secondsPassed)} seconds ago`;
    }
    return "Just now";
  };
  
  // turns a single tweet object into HTML
  const createTweetElement = function(tweetObj) {
    const $avatar = $('<img class="tweet-avatar"/>').attr('src', tweetObj.user.avatars);
    const $username = $('<span>').text(`${tweetObj.user.name}`);
    const $handle = $('<span class="tweet-handle">').text(`${tweetObj.user.handle}`);
    const $header = $('<header>')
      .append($avatar)
      .append($username)
      .append($handle);

    const $main = $('<main class="tweet-main">').text(tweetObj.content.text);

    const $timePassed = $('<span>').text(timePassed(tweetObj.created_at));
    const $tweetIcons = $('<span class="tweet-icons">')
      .append('<i class="fas fa-flag"></i>')
      .append('<i class="fas fa-retweet"></i>')
      .append('<i class="fas fa-heart"></i>')
    const $footer = $('<footer class="tweet-footer">')
      .append($timePassed)
      .append($tweetIcons)

    return $('<article class="tweet-container">')
      .append($header)
      .append($main)
      .append($footer);
  };

  // renders an array of tweet objects
  const renderTweets = function(tweetObjArr) {
    $('#tweet-container').empty();
    tweetObjArr.reverse();
    for (const obj of tweetObjArr) {
      const $tweet = createTweetElement(obj);
      $('#tweet-container').append($tweet);
    }
  };

  // returns a promise to load tweets from /tweets
  const loadTweets = function() {
    return $.ajax('/tweets', {
      method: 'GET',
    })
  }
  
  // on submit, serialize the form data and POST it to /tweets
  $('section.new-tweet > form').on('submit', function(event) {
    event.preventDefault();
    const $textarea = $('section.new-tweet > form > textarea')
    if ($textarea.val().trim() == "") {
      alert('Can\'t tweet nothing!')
    } else if ($textarea.val().length > MAX_TWEET_LENGTH) {
      alert(`Maximum tweet length is ${MAX_TWEET_LENGTH}`)
    } else {
      $.ajax('/tweets',
        {
          method:   'POST',
          data:     $(this).serialize()
        }
      ).then(() => {
        refreshTweets();
      })
    }
  })

  // load and render tweets
  const refreshTweets = function() {
    loadTweets().then(renderTweets).fail(err => console.log(err.statusText));
  }

  refreshTweets();
});