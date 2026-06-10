// 診断

$(function () {
  $('.yes:not(.to-result), .no:not(.to-result)').click(function () {
    if ($(this).parent().parent().hasClass('karte1')) {
      $('.karte2,.karte3, .karte4').hide();
      $('.karte2 .answew-box > div, .karte3 .answew-box > div,.karte4 .answew-box > div').fadeTo(0, 1);
    } else if ($(this).parent().parent().hasClass('karte2')) {
      $('.karte3,.karte4').hide();
      $('.karte3 .answew-box > div, .karte4 .answew-box > div').fadeTo(0, 1);
    } else if ($(this).parent().parent().hasClass('karte3')) {
      $('.karte4').hide();
      $('.karte4 .answew-box > div').fadeTo(0, 1);
    }

    if ($(this).hasClass('yes')) {
      $(this).fadeTo(100, 1);
      $(this).next().fadeTo(100, 0.5);
      $(this).css({'color': '#F8ACAC', 'border': '1px solid #F8ACAC'});
      $(this).next().css({'color': '#6E6E6E', 'border': '1px solid transparent'});
    } else {
      $(this).fadeTo(100, 1);
      $(this).prev().fadeTo(100, 0.5);
      $(this).css({'color': '#1C2B5F', 'border': '1px solid #1C2B5F'});
      $(this).prev().css({'color': '#6E6E6E', 'border': '1px solid transparent'});
    }

    let headerHeight,
      thisMargin = $('.shindan__questCard + .shindan__questCard').css('margin-top').replace('px', ''),
      targetQuest = $(this).attr('data-next');

    if($(window).width() <= 768) {
      headerHeight = 40;
    } else {
      headerHeight = 50;
    }

    thisMargin = Number(thisMargin);

    $(targetQuest).fadeIn(500);
    setTimeout(function () {
      let position = $(targetQuest).offset().top - headerHeight - thisMargin + 6;

      $('html, body').animate({scrollTop: position}, 900, 'easeOutCubic');
    }, 300);
  });

  $('.to-result').click(function () {
    if ($(this).hasClass('yes')) {
      $(this).fadeTo(100, 1);
      $(this).next().fadeTo(100, 0.5);
      $(this).css({'color': '#F8ACAC', 'border': '1px solid #F8ACAC'});
      $(this).next().css({'color': '#6E6E6E', 'border': '1px solid transparent'});
    } else {
      $(this).fadeTo(100, 1);
      $(this).prev().fadeTo(100, 0.5);
      $(this).css({'color': '#1C2B5F', 'border': '1px solid #1C2B5F'});
      $(this).prev().css({'color': '#6E6E6E', 'border': '1px solid transparent'});
    }
  });
});
