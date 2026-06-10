$(function(){
  
  var url = location.hash; //urlから#〜を取得する
  var hash = url.split('#');//urlの#を起点に単語を切り分ける
  console.log(hash[1]);//#の右側を取得（左の場合は0）

  if(hash[1] == 'straight'){
    $('p.sub-ttl span').text('ストレート');
  }else if(hash[1] == 'wave'){
    $('p.sub-ttl span').text('ウェーブ');
  }else{
    $('p.sub-ttl span').text('ナチュラル');
  }

  // GAS読み込み
  $.ajax({
    type: 'GET',
    url: 'https://script.google.com/macros/s/AKfycbwiiuSBQ2VaAw_tR0Im1GucOTNSYeQDQ3t5nrS6H95jwXFmGzbB1vbHP-7CfCr_XVhm/exec',
    dataType: 'json',
    async: false,
  })
  .then(
    function (json) { // json
      console.dir(json);

      var cell = []; // スプレの値
      for (var i = 0; i < json.length; i++){
        cell = json.filter(({ type }) => type == hash[1]);

        function formatLocalDate(utcString) {
            const date = new Date(utcString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}/${month}/${day}`;
        }
      }

      var item = cell.reverse().length;
      var count = item / 12;
      count = Math.ceil(count);
      for(var n = 0; n < count; n++){
        var o = n + 1;
        if(o == 1){
          $('div.pager_wrapper ul.pager').append('<li class="page-btn active" data-page="'+o+'"><a><p>'+o+'</p></a></li>');
        }else{
          $('div.pager_wrapper ul.pager').append('<li class="page-btn" data-page="'+o+'"><a><p>'+o+'</p></a></li>');
        }
      }
      console.log(count);

      for(var j = 0; j < count; j++){
        var k = j + 1;
        var page = '<div class="page" id="page'+k+'"><div id="box'+k+'"><ul></ul></div></div>';
        $(".page-wrap").append(page);

        for (var l = 0; l < 12; l++) {
          var m = 12 * j + l;
          var p = m + 1;

          // ✅ UTC→JST補正済み
          var start_date = formatLocalDate(cell[m].date);
          var publishDateTime = start_date + ' 12:00:00';
          console.log(start_date);

          $('div.page#page'+k+' div#box'+k+' ul').append(
              '<li class="timer" data-start-date="' + publishDateTime + '">' +
              '<a href="' + cell[m].URL + '">' +
              '<div class="img"><img src="' + cell[m].banner + '" alt="毎週更新！骨格タイプ別ウェーブ・ストレート・ナチュラルに似合う服。おすすめ商品&コーデを紹介"></div>' +
              '<p class="date">' + start_date + '</p>' +
              '<p class="type"></p>' +
              '<p class="title">' + cell[m].title + '</p>' +
              '</a></li>'
          );

          if (hash[1] == 'straight') {
              $('p.type').text('【骨格ストレート】');
          } else if (hash[1] == 'wave') {
              $('p.type').text('【骨格ウェーブ】');
          } else {
              $('p.type').text('【骨格ナチュラル】');
          }

          if (p == item) {
              break;
          }
        }
      }

      $(".timer").each(function (index, target) {
        var startDate = $(this).attr("data-start-date");
        var endDate = $(this).attr("data-end-date");
        var nowDate = new Date();

        var url = location.href;
        var preDate = "";
        params = url.split("?");
        if (params.length > 1) {
            spparams = params[1].split("&");

            var paramArray = [];
            for (i = 0; i < spparams.length; i++) {
                keyvalue = spparams[i].split("=");
                if (keyvalue[0] == "timer") {
                    preDate = decodeURI(keyvalue[1]);
                }
            }
        }

        //alert(preDate);
        if (preDate) {
            nowDate = new Date(preDate);
            if (startDate) {
                startDate = new Date(startDate);
            } else {
                startDate = nowDate;
            }
            if (endDate) {
                endDate = new Date(endDate);
            }
        } else {
            if (startDate) {
                startDate = new Date(startDate);
            } else {
                startDate = nowDate;
            }
            if (endDate) {
                endDate = new Date(endDate);
            }
        }

        if (startDate <= nowDate && (!endDate || nowDate < endDate)) {
            $(this).show();
        } else {
            $(this).remove();
        }

      });
  });
});


$(function(){
  $('ul.pager li').on('click',function(){
    var num = $(this).data('page');
    console.log(num);

    $('.page-wrap .page').fadeOut();
    $('.pager li').removeClass('active');
    $(this).addClass('active');
    $('.page-wrap .page#page'+num).fadeIn();
  });

  $('.next-btn').on('click', function(){
    var pager = $('ul.pager li').length;
    console.log(pager);
    var num = $('.pager li.active').data('page');
    var num2 = num + 1;
    console.log(num);
    if(num != pager){
      $('.page-wrap .page').fadeOut();
        $('.pager li').removeClass('active');
        $('.pager li').eq(num).addClass('active');
        $('.page-wrap .page#page'+num2).fadeIn();
    }
  });

  $('.prev-btn').on('click', function(){
    var num = $('.pager li.active').data('page');
    var num2 = num - 1;
    var num3 = num2 - 1;
    console.log(num);
    console.log(num2);
    if(num2 > 0){
      $('.page-wrap .page').fadeOut();
      $('.pager li').removeClass('active');
      $('.pager li').eq(num3).addClass('active');
      $('.page-wrap .page#page'+num2).fadeIn();
    }
  });
});


