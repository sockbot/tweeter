$(document).ready(function() {
  $('.new-tweet > form > textarea').on('keyup', function() {
    updateCounter(calcRemainingChars());
  });
});