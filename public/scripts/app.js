// declaring variables and functions in global scope so it can be accessed from other js files
// this is ok as long as they are not called except within a document.ready scope
// also this means this js file must be loaded on every page of the app in order for other files to reference these global declarations
const MAX_TWEET_LENGTH = 140;

const calcRemainingChars = function() {
  return MAX_TWEET_LENGTH - $('textarea').val().length;
};

const updateCounter = function(remainingChars) {
  const counter = $('span.counter');

  counter.text(remainingChars);
  if (remainingChars < 0) {
    counter.addClass('red');
  } else {
    counter.removeClass('red');
  }
};

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const printError = function(err) {
    console.log(`Promise failed with error: ${err}`);
  };

  // calculates the amount of time passed since timestamp (in milliseconds) and returns a string in human-readable format
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
  
  // turns a single tweet object into jQuery HTML
  const createTweetElement = function(tweetObj) {
    const $avatar = $('<img class="tweet-avatar">').attr('src', tweetObj.user.avatars);
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
      .append('<i class="fas fa-heart"></i>');
    const $footer = $('<footer class="tweet-footer">')
      .append($timePassed)
      .append($tweetIcons);

    return $('<article class="tweet-container">')
      .append($header)
      .append($main)
      .append($footer);
  };

  // renders an array of tweet objects to the #tweet-container
  const renderTweets = function(tweetObjArr) {
    $('#tweet-container').empty();
    tweetObjArr.reverse();
    for (const obj of tweetObjArr) {
      const $tweet = createTweetElement(obj);
      $('#tweet-container').append($tweet);
    }
  };

  // returns a promise to GET tweets from /tweets
  const loadTweets = function() {
    return $.get('/tweets').fail(err => printError(err.statusText));
  };
  
  // on submit, serialize the form data and POST it to /tweets
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('.error').slideUp();
    const $textarea = $('textarea');
    if ($textarea.val().trim() == "") { // using == to broadly match empty string
      $('.error').slideDown().text(`${MAX_TWEET_LENGTH} characters and you have nothing to say?`);
    } else if ($textarea.val().length > MAX_TWEET_LENGTH) {
      $('.error').slideDown().text(`Maximum tweet length is ${MAX_TWEET_LENGTH} characters!`);
    } else {
      $.post('/tweets', $(this).serialize())
        .then(() => {
          $textarea.val('').focus();
          updateCounter(calcRemainingChars());
          refreshTweets();
        })
        .fail(err => printError(err.statusText));
    }
  });

  // show and hide new tweet div when clicking the toggle new tweet button
  $('.toggle-button').on('click', function() {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });

  // load and render tweets
  const refreshTweets = function() {
    loadTweets().then(renderTweets).fail(err => printError(err.statusText));
  };

  refreshTweets();
});