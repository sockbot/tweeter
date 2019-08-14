/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  // const timeAgo = function ()
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
        <span>${Date(tweetObj.created_at)}</span>
        <span class="tweet-icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
      </footer>
    </article>
    `;
  };

  const $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  // $('main.container').append($tweet);
});