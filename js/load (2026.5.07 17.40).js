// csv, list取得
// 毎週更新

$(function () {
  let updateTime = "2026/04/27 12:00:00", // 更新
    url = location.href,
    preTime = "",
    params = url.split("?"),
    spparams;

  if (params.length > 1) {
    spparams = params[1].split("&");

    let paramArray = [];

    for (i = 0; i < spparams.length; i++) {
      keyvalue = spparams[i].split("=");
      if (keyvalue[0] == "view_timer") {
        preTime = decodeURI(keyvalue[1]);
      }
    }
  }

  let update = new Date(updateTime),
    now = new Date(),
    pre = new Date(preTime);

  if (isNaN(pre)) {
    pre = "";
  }

  if (pre >= update || (now >= update && pre === "")) {
    // console.log('更新日後');
    $.get("csv/kokkaku_next.csv", parseCsv, "text");
  } else {
    // console.log('更新日前');
    $.get("csv/kokkaku.csv", parseCsv, "text");
  }

  let csv;

  let updatetimeNew = updateTime.replaceAll("/", "-").split(" ");
  console.log(updatetimeNew);
  var currentURL = location.href;
  if (currentURL.indexOf("straight") > -1) {
    $("body").append(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプストレートの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプストレートに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
        updatetimeNew[0] +
        'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}</script>',
    );
  } else if (currentURL.indexOf("wave") > -1) {
    $("body").append(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプウェーブの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプウェーブに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
        updatetimeNew[0] +
        'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}</script>',
    );
  } else if (currentURL.indexOf("natural") > -1) {
    $("body").append(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプナチュラルの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプナチュラルに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
        updatetimeNew[0] +
        'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}</script>',
    );
  } else {
    $("body").append(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプ別ウェーブ・ストレート・ナチュラルに似合う服。おすすめ商品&コーデを紹介 | PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプウェーブ・ストレート・ナチュラル別に似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも毎週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
        updatetimeNew[0] +
        'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}</script>',
    );
  }

  function parseCsv(data) {
    csv = $.csv.toArrays(data);

    let date = csv[1][0],
      update = csv[1][1],
      title = csv[1][2],
      straight_url = csv[1][3],
      wave_url = csv[1][4],
      natural_url = csv[1][5],
      straight_snap = csv[1][6],
      wave_snap = csv[1][7],
      natural_snap = csv[1][8],
      keyword = csv[1][9];

    $("#upload").html(date);
    $(".result__date").html(update);
    $(".result__itemTitle span:first-child").html(title);
    $(".result__title").html(title);
    $("#straight-more").attr("href", straight_url);
    $("#wave-more").attr("href", wave_url);
    $("#natural-more").attr("href", natural_url);
    $("#straightSnap-more").attr("href", straight_snap);
    $("#waveSnap-more").attr("href", wave_snap);
    $("#naturalSnap-more").attr("href", natural_snap);

    console.log(`キーワード : ${keyword}`);

    // --------------------------------------------------

    // 現在のページのURLを取得
    const currentPage = window.location.href;

    // おすすめアイテム表示数
    let itemNum;
    // index.htmlでは12、それ以外のページでは12表示
    if (
      currentPage.includes("straight.html") ||
      currentPage.includes("wave.html") ||
      currentPage.includes("natural.html")
    ) {
      itemNum = 12;
    } else {
      itemNum = 12;
    }

    let snapNum;
    // index.htmlでは8、それ以外のページでは6表示
    if (
      currentPage.includes("straight.html") ||
      currentPage.includes("wave.html") ||
      currentPage.includes("natural.html")
    ) {
      snapNum = 6;
    } else {
      snapNum = 6;
    }

    // --------------------------------------------------

    // item list 取得
    function getItemList(url, typeId) {
      if (url.indexOf("&g=1") === -1) {
        url += "&g=1";
      }
      $.ajax({
        type: "GET",
        url: url,

        dataType: "html",
        headers: {
          escape: "queueit",
        },
      }).done(function (data) {
        var out_html = $($.parseHTML(data));
        var winW = $(window).width();
        var devW = 767;
        if (winW <= devW) {
          var list = out_html.find(`#item_list div:nth-child(-n+${itemNum})`);
          $(`${typeId} .result__itemList`).empty().append(list);
          $(`${typeId} .result__itemList a`).attr(
            "onclick",
            "dataLayer.push({'event': 'click_event', 'event_category': 'banner','event_action': 'click', 'event_label': 'palcloset_230626_stylecheckLP_item'})",
          );
          // $(`${typeId} .result__itemList > div`).addClass('animated inviewfadeIn');
          lazyLoading(`${typeId} .result__itemList img`);
        } else {
          var list = out_html.find(`#item_list li:nth-child(-n+${itemNum})`);
          $(`${typeId} .result__itemList`).empty().append(list);
          $(`${typeId} .result__itemList a`).attr(
            "onclick",
            "dataLayer.push({'event': 'click_event', 'event_category': 'banner','event_action': 'click', 'event_label': 'palcloset_230626_stylecheckLP_item'})",
          );
          // $(`${typeId} .result__itemList > li`).addClass('animated inviewfadeIn');
          lazyLoading(`${typeId} .result__itemList img`);
        }
      });
    }

    // staff snap 取得
    function getSnapList(target, url, typeId, alt) {
      $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
      }).then(
        function (json) {
          console.log(`${target}: 成功`);
          console.dir(json);
          for (var i = 0; i < snapNum; i++) {
            image_url = json.item[i].image_url;
            label_name = json.item[i].label_name;
            user_height = json.item[i].user_height;
            cid = json.item[i].cid;
            label_code = json.item[i].label_code;
            code_url =
              "/addons/coordinate/detail/?acd=" + cid + "&b=" + label_code;
            $(`${typeId} .result__snapList`).append(
              '<li><a href="' +
                code_url +
                '"><div class="img"><img src="' +
                image_url +
                '" alt="' +
                alt +
                '"></div><p class="brand">' +
                label_name +
                '</p><p class="tall">' +
                user_height +
                "cm</p></a></li>",
            );
            // $(`${typeId} .result__snapList`).append("<li class=\"animated inviewfadeIn\"><a href=\"" + code_url + "\"><div class=\"img\"><img src=\"" + image_url + "\"></div><p class=\"brand\">" + label_name + "</p><p class=\"tall\">" + user_height + "cm</p></a></li>")
          }
        },
        function () {
          console.log(`${target}: 失敗`);
        },
      );
    }

    // type id
    const straight_id = "#result-straight",
      wave_id = "#result-wave",
      natural_id = "#result-natural";

    // snap url
    const straight_snapApi =
        "https://api.staff-start.com/v1/coordinate/?merchant_id=Y75tLWJ7X2kWeke4Tk9UwUEcdKhAnKZp&count=30&sort=sales&user_attributes[][slug]=kokkaku_01&user_attributes[][value]=straight&label=ainode,beardsley,lemage,chez_toi,chico,ciaopanic,typy,collage,colony2139,cpcm,discoat,doudou,earpapillonner,earthy_,fredyandgloaster,gallardagalante,iacucci,jena,kastane,,laboutiquebonbon,laruta,loungedress,luis,mystic,naturalcouture,niceclaup_outlet,olivedesolive,omekashi,niceclaup,oneme,outlet,pasterip,proseverse,pualcecin,rivedroite,russet,seemi,shenery,thevon,twoles,undixcors,whimgazette,whoswhogallery,croisiere,drawingnumbers,gemeil,goocy,livetart,mline,nolleys,raycassin,remindmeandforever,wcloset&user_gender=2&keyword=" +
        keyword,
      wave_snapApi =
        "https://api.staff-start.com/v1/coordinate/?merchant_id=Y75tLWJ7X2kWeke4Tk9UwUEcdKhAnKZp&count=30&sort=sales&user_attributes[][slug]=kokkaku_01&user_attributes[][value]=wave&label=ainode,beardsley,lemage,chez_toi,chico,ciaopanic,typy,collage,colony2139,cpcm,discoat,doudou,earpapillonner,earthy_,fredyandgloaster,gallardagalante,iacucci,jena,kastane,,laboutiquebonbon,laruta,loungedress,luis,mystic,naturalcouture,niceclaup_outlet,olivedesolive,omekashi,niceclaup,oneme,outlet,pasterip,proseverse,pualcecin,rivedroite,russet,seemi,shenery,thevon,twoles,undixcors,whimgazette,whoswhogallery,croisiere,drawingnumbers,gemeil,goocy,livetart,mline,nolleys,raycassin,remindmeandforever,wcloset&user_gender=2&keyword=" +
        keyword,
      natural_snapApi =
        "https://api.staff-start.com/v1/coordinate/?merchant_id=Y75tLWJ7X2kWeke4Tk9UwUEcdKhAnKZp&count=30&sort=sales&user_attributes[][slug]=kokkaku_01&user_attributes[][value]=natural&label=ainode,beardsley,lemage,chez_toi,chico,ciaopanic,typy,collage,colony2139,cpcm,discoat,doudou,earpapillonner,earthy_,fredyandgloaster,gallardagalante,iacucci,jena,kastane,,laboutiquebonbon,laruta,loungedress,luis,mystic,naturalcouture,niceclaup_outlet,olivedesolive,omekashi,niceclaup,oneme,outlet,pasterip,proseverse,pualcecin,rivedroite,russet,seemi,shenery,thevon,twoles,undixcors,whimgazette,whoswhogallery,croisiere,drawingnumbers,gemeil,goocy,livetart,mline,nolleys,raycassin,remindmeandforever,wcloset&user_gender=2&keyword=" +
        keyword;

    // snap alt
    const straight_alt = "骨格ストレートのコーディネート",
      wave_alt = "骨格ウェーブのコーディネート",
      natural_alt = "骨格ナチュラルのコーディネート";

    // straight
    getItemList(straight_url, straight_id);
    getSnapList("straight", straight_snapApi, straight_id, straight_alt);

    // wave
    getItemList(wave_url, wave_id);
    getSnapList("wave", wave_snapApi, wave_id, wave_alt);

    // natural
    getItemList(natural_url, natural_id);
    getSnapList("natural", natural_snapApi, natural_id, natural_alt);
  }
});

// 遅延時画像
function lazyLoading(selector) {
  [].slice.call(document.querySelectorAll(selector)).forEach(function (target) {
    if ("IntersectionObserver" in window) {
      var thumbImgIo = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (
              !entry.target.getAttribute("src") ||
              entry.target.getAttribute("src").indexOf("load.gif") > 0
            ) {
              entry.target.setAttribute(
                "src",
                entry.target.getAttribute("data-src"),
              );
            }
            if (!entry.target.getAttribute("alt")) {
              entry.target.setAttribute(
                "alt",
                entry.target.getAttribute("data-alt"),
              );
            }
            observer.disconnect();
          }
        });
      });
      thumbImgIo.observe(target);
    } else {
      target.setAttribute("src", target.getAttribute("data-src"));
    }
  });
}
