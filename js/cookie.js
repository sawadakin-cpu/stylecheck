// cookie

$(function () {
  function cookieSet(type) {
    $.removeCookie('st-type');
    $.cookie('st-type', type, {
      expires: 365,
      path: '/',
      domain: 'palcloset.jp'
    });
  }

  $('.toresult-straight').on('click', function () {
    $('.jsc-card').fadeOut();
    $('#card-straight').fadeIn();
    cookieSet('straight');
  });

  $('.toresult-wave').on('click', function () {
    $('.jsc-card').fadeOut();
    $('#card-wave').fadeIn();
    cookieSet('wave');
  });

  $('.toresult-natural').on('click', function () {
    $('.jsc-card').fadeOut();
    $('#card-natural').fadeIn();
    cookieSet('natural');
  });

  $('.cookie-straight').on('click', function () {
    cookieSet('straight');
  });

  $('.cookie-wave').on('click', function () {
    cookieSet('wave');
  });

  $('.cookie-natural').on('click', function () {
    cookieSet('natural');
  });
});
