//<!------ 공통 스크립트 시작 ------> 
$(document).ready(function() {
  initHeader();  
  waypoint_slide();
  initLenis();
}) 

// 모바일에서 새로고침 막기
lastWidth = window.innerWidth;
$(window).resize(function(){
if(window.innerWidth != lastWidth){
	location.reload();
	scrollTrigger.refresh();
}
lastWidth = window.innerWidth;
});

// 웨이포인트 - 애니메이션 스크립트
function waypoint_slide(){  
  var target = $('.slide-in-up')
  target.each(function (i, v) {
    $(this).waypoint(function () {
      $(v).addClass('on')
    }, {
      offset: '100%',
    })
  })
}

// 헤더관련
function initHeader(){  

  // 스크롤 헤더
  var last_scrollTop = 0;
  $(window).on("load scroll", function() { 
    var height = $(document).scrollTop();
    var tmp = $(this).scrollTop();
    if ($(window).scrollTop() > 0) {
      $('#header').addClass("reverse")
    } else { 
      $('#header').removeClass("reverse")
    }
    if (tmp > last_scrollTop && $(window).scrollTop() > 0) { //down
      $("#header").addClass('down');
      $("#header").removeClass('up');
      $('.moblie_nav_btn').removeClass('close')
      $("#header").removeClass('menu-open'); //스크롤시 헤더 초기화
      $('#header .nav').removeClass('on')
    } else { //up
      $("#header").addClass('up');
      $("#header").removeClass('down'); 
      $('.moblie_nav_btn').removeClass('close')
      $("#header").removeClass('menu-open'); //스크롤시 헤더 초기화
      $('#header .nav').removeClass('on')
    } 
    last_scrollTop = tmp;
  });

  // 모바일 nav 열기
  $('body').on('click', '.moblie_nav_btn', function(){
    $('#header').addClass('menu-open');
    $('#header .nav').addClass('on')
    if ($('.moblie_nav_btn').hasClass('close')) {
      $('#header .nav').addClass('on')
      $(this).removeClass('close')
      $('#header .nav').removeClass('on')
      $('#header').removeClass('menu-open')
      $('.menu').removeClass('open')
      $('.menu .gnb li').removeClass('open')
    } else {
      $(this).addClass('close')
      $('#header .nav').addClass('on')
    }
  })

  // 사이트맵 열기
  $('body').on('click', '.sitemap-btn', function(){
    const lenis = new Lenis()
    $('#header').addClass('sitemap')
    $('#header').removeClass('on')
    if ($(".sitemap-btn").hasClass('close')) {
      $('.sitemap_nav').addClass('on')
      $(this).removeClass('close')
      $('.sitemap_nav').removeClass('on')
      $('#header').removeClass('sitemap')
      $("header").on('mouseenter',function(){
        $("header").addClass("on");
      });
      $("header").on('mouseleave',function(){
          $("header").removeClass("on");
      });
      lenis.start();
      
    } else {
      lenis.stop();
      $(this).addClass('close')
      $('#header').removeClass('on')
      $('.sitemap_nav').addClass('on')
      $("header").off('mouseenter')
      $("header").off('mouseleave')
    }
  })


  // 모바일 nav gnb
  $('body').on('click', ".menu a, .menu .button", function(){
    var width = $(window).width();
    if (width < 1280) { //mobile
      $(".menu a").parent().on('click');
      // $(this).next(".menu").stop().slideToggle(300);
      $(this).parent().toggleClass('open').siblings().removeClass('open');
      $('.menu .gnb li').removeClass('open')
      // console.log("!!!!!!!모바일이라고!")
      // $(this).next(".menu").siblings(".menu").slideUp(300);
    } 
  });

  // PC nav gnb
  $('body').on('click', ".menu a, .menu .button", function(){
    var width = $(window).width();
    if (width >= 1280) { //pc
      $(".menu a").parent().off('click');
      $(".menu .button").parent().toggleClass('open').siblings().removeClass('open');
      $('.menu .gnb li').removeClass('open')
      // console.log("!!!!!!!pc라고!")
      // $(this).next(".menu").siblings(".menu").slideUp(300); 
    }
  });

  // nav gnb_gnb 열기  
  $('body').on('click', ".gnb li .down", function(){
    // $(this).next(".menu").stop().slideToggle(300);
    $(this).parent().toggleClass('open').siblings().removeClass('open');
    // $(this).next(".menu").siblings(".menu").slideUp(300); 
    // lenis.start();
    // if($(this).hasClass('on')){
    //   lenis.stop();
    // }
  });

  menuFunc();

  // 화면 사이즈 변경시
  $(window).on('resize',function(){
    width = $(window).width();
    headHeight = $("#header").innerHeight();
    $("#header").removeClass("menu-open"); 
    $(".menu").removeClass("open");
    $(".nav").removeClass("on"); 
    $(".moblie_nav_btn").removeClass("close"); 
    menuFunc(); 
  });

  // 기본 nav 동작
  function menuFunc() {
    var width = $(window).width();
    if (width < 1280) { //mobile
      $("header").off('mouseenter');
      $("header").off('mouseleave');
      $('#header').removeClass('sitemap')
      $('.sitemap_nav').removeClass('on')
      $('.sitemap-btn').removeClass('close')
      // 클릭방지이벤트
      // $(".menu > a").on('click',function(e){
      //     e.preventDefault();
      // });
      // $(".menu:nth-child(2) > .gnb > li > a").on('click',function(e){
      //   e.preventDefault();
      // });
    }else if (width >= 1280) { //pc
      // $(".menu a").off('click'); 
      // $(".menu .button").off('click');
      // $(".menu:nth-child(2) > .gnb > li > a").off('click');
      $("header").on('mouseenter',function(){
          $("header").addClass("on");
      });
      $("header").on('mouseleave',function(){
          $("header").removeClass("on");
          // $(this).addClass("on");
      });
    } 
  }
}

// 스크롤 부드럽게
function initLenis(){
  const lenis = new Lenis({
    // duration: 2,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  
  // lenis.on('scroll', (e) => {
  //   console.log(e)
  // })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

//탑버튼 이벤트 -- 위치 잡기
$(document).ready(function() {
  var topBtn = $('.topbtn');
  var winTop = $(window).scrollTop();

  function topBtnScroll() {
    var winHeight = $(window).height();
    var footerTop = $('.footer').offset().top;
    var footerHeight = $('.footer').innerHeight();
    var bottomMargin;

    winW = $(window).width();
    if(winW <= 1280){
      bottomMargin = 20;
    } else {
      bottomMargin = 50;
    }

    winTop = $(window).scrollTop();

    if (winTop > (winHeight / 5)) {
      topBtn
      .show()
      .stop()
      .animate({opacity: 1 },300)
    } else {
      topBtn
      .stop()
      .animate({opacity: 0},300, function(){$(this).hide();})
    }

    if ((winHeight + winTop) >= (footerTop+500)) {
      topBtn.addClass('isAbs')
      .css({
        // 'bottom': bottomMargin + 'px',
        // 'margin-bottom': 0
      })
    } else {
      topBtn.removeClass('isAbs')
      .css({
        'margin-bottom':  (-60)+ 'px'
      })
    }
  }

  $(window).on('scroll', topBtnScroll)

  //탑버튼 클릭시 상단으로 이동
  $('.topbtn').on('click', function () {
    $('html,body').animate({
        scrollTop: 0
    },0);
  });
})
