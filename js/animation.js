// common animation

$(function () {
  // scroll
  let headerHeight;

  if ($(window).width() <= 768) {
    headerHeight = 40;
  } else {
    headerHeight = 50;
  }

  $("#to-shindan").on("click", function () {
    $("#question").fadeIn();
  });

  $('a[href^="#"]').click(function () {
    let speed = 400,
      href = $(this).attr("href"),
      target = $(href == "#" || href == "" ? "html" : href);
    position = target.offset().top - headerHeight;

    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  // animation
  $(".inviewfadeIn").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).addClass("fadeIn");
    }
  });

  $(".fadeToRight").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).addClass("is-active");
    }
  });

  // fixed menu, other css
  const currentPage = window.location.href;

  // if (
  //   currentPage.includes("straight.html") ||
  //   currentPage.includes("wave.html") ||
  //   currentPage.includes("natural.html")
  // ) {
  //   gsap.set(".fixed", { autoAlpha: 1 });
  //   gsap.to(".fixed", {
  //     autoAlpha: 0,
  //     scrollTrigger: {
  //       // trigger: '.result__item',
  //       trigger: ".check__inner",
  //       start: "top bottom",
  //       toggleActions: "play none none reverse",
  //     },
  //   });

  //   $(".other").addClass("is-desc");
  // }
  window.addEventListener("load", () => {
    if (
      currentPage.includes("straight.html") ||
      currentPage.includes("wave.html") ||
      currentPage.includes("natural.html")
    ) {
      gsap.set(".fixed", { autoAlpha: 1 });
      gsap.to(".fixed", {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".check__inner",
          start: "top+=84 bottom",
          toggleActions: "play none none reverse",
        },
      });

      $(".other").addClass("is-desc");

      // Vueが描画完了してから再計算
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  });

  // result menu
  $(".result-straight").on("inview", function (event, isInView) {
    if (isInView) {
      $(".result__menuList li").removeClass("is-active");
      $(".result__menuList li:nth-child(1)").addClass("is-active");
    }
  });

  $(".result-wave").on("inview", function (event, isInView) {
    if (isInView) {
      $(".result__menuList li").removeClass("is-active");
      $(".result__menuList li:nth-child(2)").addClass("is-active");
    }
  });

  $(".result-natural").on("inview", function (event, isInView) {
    if (isInView) {
      $(".result__menuList li").removeClass("is-active");
      $(".result__menuList li:nth-child(3)").addClass("is-active");
    }
  });
});
