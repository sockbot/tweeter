"use strict";

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
  // TODO: build programmatically using jQuery methods in order to sanitize input
  const createTweetElement = function(tweetObj) {
    return `
    <article class="tweet-container">
      <header>
        <span>${tweetObj.user.name}</span>
        <span class="tweet-handle">${tweetObj.user.handle}</span>
      </header>
      <main class=tweet-main>
        ${tweetObj.content.text}
      </main>
      <footer class="tweet-footer">
        <span>${timePassed(tweetObj.created_at)}</span>
        <span class="tweet-icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
      </footer>
    </article>
    `;
  };

  // renders an array of tweet objects
  const renderTweets = function(tweetObjArr) {
    tweetObjArr.reverse();
    for (const obj of tweetObjArr) {
      const $tweet = createTweetElement(obj);
      $('main.container').append($tweet);
    }
  };

  const loadtweets = function() {
    return $.ajax('/tweets', {
      method: 'GET',
    })
  }
  
  // on submit, serialize the form data and POST it to /tweets
  $('section.new-tweet > form').on('submit', function(event) {
    event.preventDefault();
    $.ajax('/tweets',
      {
        method:   'POST',
        data:     $(this).serialize()
      }
    )
  });

  loadtweets().then(renderTweets).fail(err => console.log(err.statusText));
});