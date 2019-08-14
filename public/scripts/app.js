/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('article.tweet-container').hover(function() {
    const tweetContainer = $(this);
    const tweetHandle = $(this).find('.tweet-handle');
    tweetContainer.addClass('hover');
    tweetHandle.addClass('hover');
  }, function() {
    const tweetContainer = $(this);
    const tweetHandle = $(this).find('.tweet-handle');
    tweetContainer.removeClass('hover');
    tweetHandle.removeClass('hover');
  })
})