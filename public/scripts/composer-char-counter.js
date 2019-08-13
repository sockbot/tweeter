$(document).ready(function() {
  const maxTweetLength = 140;
  $('.new-tweet > form > textarea').on('keyup', function() {
    const tweetChars = $(this).val().length;
    const remainingChars = maxTweetLength - tweetChars;
    const counter = $(this).siblings('span.counter');
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  })
})