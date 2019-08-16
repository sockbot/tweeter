$(() => {
  $(window).scroll(function() {
    if ($(window).scrollTop() === 0) {
      $('#scroll-up').hide();
    } else {
      $('#scroll-up').show();
    }
  });
});