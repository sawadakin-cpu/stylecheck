// GitHub Pages JSON fetch
// 毎週更新

$(function () {
  const DATA_URL = "https://sawadakin-pu.github.io/stylecheck/data.json";

  // URLパラメータ（プレビュー用：?page=20260608）
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");

  // 現在時刻（JST）
  const jstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const today =
    String(jstNow.getUTCFullYear()) +
    String(jstNow.getUTCMonth() + 1).padStart(2, "0") +
    String(jstNow.getUTCDate()).padStart(2, "0");
  const jstHour = jstNow.getUTCHours();

  // startが現在時刻（12:00JST基準）を過ぎているか
  const isActive = (start) =>
    start < today || (start === today && jstHour >= 12);

  $.ajax({
    type: "GET",
    url: DATA_URL,
    dataType: "json",
  })
    .done(function (json) {
      const content = pageParam
        ? json.contents.find((item) => item.start === pageParam)
        : json.contents.find((item) => isActive(item.start));

      if (!content) {
        console.log("表示するコンテンツが見つかりませんでした");
        return;
      }

      initPage(content);
    })
    .fail(function () {
      console.log("データ取得 失敗");
    });

  function toSnapApi(palUrl, type) {
    var match = palUrl.match(/[?&]keyword=([^&]*)/);
    var keyword = match ? match[1] : "";
    return (
      "https://api.staff-start.com/v1/coordinate/?merchant_id=Y75tLWJ7X2kWeke4Tk9UwUEcdKhAnKZp&count=30&sort=sales&user_attributes[][slug]=kokkaku_01&user_attributes[][value]=" +
      type +
      "&label=ainode,beardsley,lemage,chez_toi,chico,ciaopanic,typy,collage,colony2139,cpcm,discoat,doudou,earpapillonner,earthy_,fredyandgloaster,gallardagalante,iacucci,jena,kastane,,laboutiquebonbon,laruta,loungedress,luis,mystic,naturalcouture,niceclaup_outlet,olivedesolive,omekashi,niceclaup,oneme,outlet,pasterip,proseverse,pualcecin,rivedroite,russet,seemi,shenery,thevon,twoles,undixcors,whimgazette,whoswhogallery,croisiere,drawingnumbers,gemeil,goocy,livetart,mline,nolleys,raycassin,remindmeandforever,wcloset&user_gender=2&keyword=" +
      keyword
    );
  }

  function initPage(content) {
    const {
      start,
      title,
      straight_item,
      wave_item,
      natural_item,
      straight_snap,
      wave_snap,
      natural_snap,
    } = content;

    // "20260608" → "06/08(月)" / "2026-06-08"
    const dateDisp = `${start.slice(4, 6)}.${start.slice(6, 8)}(MON)`;
    const isoDate = `${start.slice(0, 4)}-${start.slice(4, 6)}-${start.slice(6, 8)}`;

    $("#upload").html(dateDisp);
    $(".result__date").html(dateDisp);
    $(".result__itemTitle span:first-child").html(title);
    $(".result__title").html(title);
    $("#straight-more").attr("href", straight_item);
    $("#wave-more").attr("href", wave_item);
    $("#natural-more").attr("href", natural_item);
    $("#straightSnap-more").attr("href", straight_snap);
    $("#waveSnap-more").attr("href", wave_snap);
    $("#naturalSnap-more").attr("href", natural_snap);

    /*--------------------------------------*
     * 構造化データ（JSON-LD）の埋め込み
     *--------------------------------------*/
    const currentURL = location.href;
    if (currentURL.indexOf("straight") > -1) {
      $("body").append(
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプストレートの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプストレートに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
          isoDate +
          'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}<\/script>',
      );
    } else if (currentURL.indexOf("wave") > -1) {
      $("body").append(
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプウェーブの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプウェーブに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
          isoDate +
          'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}<\/script>',
      );
    } else if (currentURL.indexOf("natural") > -1) {
      $("body").append(
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプナチュラルの似合う服。おすすめ商品&コーディネートを紹介| PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプナチュラルに似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも隔週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
          isoDate +
          'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}<\/script>',
      );
    } else {
      $("body").append(
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","headline":"隔週更新！骨格タイプ別ウェーブ・ストレート・ナチュラルに似合う服。おすすめ商品&コーデを紹介 | PAL CLOSET(パルクローゼット) - パルグループ公式ファッション通販サイト","description":"骨格タイプウェーブ・ストレート・ナチュラル別に似合う素材、柄、着こなしポイントを徹底解説。今すぐ着られるおすすめのシーズンアイテムとスタッフコーデも毎週更新！","image":{"@type":"ImageObject","url":"/shared/pc_pal/event/palcloset/stylecheck/images/banner.jpg","width":710,"height":473},"datePublished":"2025-05-21T12:00:00+09:00","dateModified":"' +
          isoDate +
          'T12:00:00+09:00","author":{"@type":"Organization","name":"株式会社パル"},"publisher":{"@type":"Organization","name":"株式会社パル","logo":{"@type":"ImageObject","url":"/static/mallDefault/shared/pc_pal/images/lm20250220160811/palcloset_logo.svg"}}}<\/script>',
      );
    }

    // おすすめアイテム・スナップ表示数
    const itemNum = 12;
    const snapNum = 6;

    const straight_id = "#result-straight";
    const wave_id = "#result-wave";
    const natural_id = "#result-natural";
    const straight_alt = "骨格ストレートのコーディネート";
    const wave_alt = "骨格ウェーブのコーディネート";
    const natural_alt = "骨格ナチュラルのコーディネート";

    getItemList(straight_item, straight_id);
    getSnapList(
      "straight",
      toSnapApi(straight_snap, "straight"),
      straight_id,
      straight_alt,
    );
    getItemList(wave_item, wave_id);
    getSnapList("wave", toSnapApi(wave_snap, "wave"), wave_id, wave_alt);
    getItemList(natural_item, natural_id);
    getSnapList(
      "natural",
      toSnapApi(natural_snap, "natural"),
      natural_id,
      natural_alt,
    );

    /*--------------------------------------*
     * アイテムリストの取得と表示
     *--------------------------------------*/
    function getItemList(url, typeId) {
      if (url.indexOf("&g=1") === -1) {
        url += "&g=1";
      }
      $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        headers: { escape: "queueit" },
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
          lazyLoading(`${typeId} .result__itemList img`);
        } else {
          var list = out_html.find(`#item_list li:nth-child(-n+${itemNum})`);
          $(`${typeId} .result__itemList`).empty().append(list);
          $(`${typeId} .result__itemList a`).attr(
            "onclick",
            "dataLayer.push({'event': 'click_event', 'event_category': 'banner','event_action': 'click', 'event_label': 'palcloset_230626_stylecheckLP_item'})",
          );
          lazyLoading(`${typeId} .result__itemList img`);
        }
      });
    }

    /*--------------------------------------*
     * スタッフスナップの取得と表示
     *--------------------------------------*/
    function getSnapList(target, url, typeId, alt) {
      $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
      }).then(
        function (json) {
          console.log(`${target}: 成功`);
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
          }
        },
        function () {
          console.log(`${target}: 失敗`);
        },
      );
    }
  }
});

/*--------------------------------------*
 * 遅延読み込み関数（lazyLoading）
 *--------------------------------------*/
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
