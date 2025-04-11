// jquery 시작
jQuery(document).ready(function () {

  // 상단 메인 배너 slick
  $('.main-slider').slick({
      dots:true,
      fade:true,
    //   speed : 2500,
      customPaging: function(slider, i) { 
          //console.log($(slider.$slides[i]).html());
          return '<button class="tab"><div class="s-indicator only-pc"><span class="inner-txt">' + $(slider.$slides[i]).find('.slide-item').attr('data-dot-title') + '</span></div><span class="s-line-fill"></span></button>';
      },
  });
  
  // 재생 및 정지 버튼 클릭
  $('.s-autoplay-btn').click(function(){
      var $sliderWrap = $(this).parent();
      
      if ( $sliderWrap.attr('data-slick-autoplay-status') == 'Y' ){
          $sliderWrap.attr('data-slick-autoplay-status', 'N');
      }
      else if ( $sliderWrap.attr('data-slick-autoplay-status') == 'N' ){
          $sliderWrap.attr('data-slick-autoplay-status', 'Y');
      }
  })
  
    // main-progressbar 다 차면 슬라이드 시키기
    setInterval(function() {
        $('.slider-wrap > .main-slider').each(function(index, node) {
            var $slider = $(node);
            
            if ( $slider.parent().attr('data-slick-autoplay-status') !== 'N' ) {
                var width = $slider.find('.slick-dots .slick-active > button > .s-line-fill').css('width');
                var buttonWidth = $slider.find('.slick-dots .slick-active > button').css('width');
                
                if ( width == buttonWidth ) {
                    $slider.slick('slickNext');
                }
            }
        });
    }, 250);

    //서비스 관련 애니메이션
    $(function(){
        $('.grid_wrap .grid').mouseenter(function(e) {
            $(this).addClass('on');
        });
        $('.grid_wrap .grid').mouseleave(function(e) {
            $(this).removeClass('on');
        });
    });

    // 파트너
    $(".logo-slide").each(function() {
        var thisID = $(this).parent().attr("id")
        var logoSwiper = new Swiper("#" + thisID + " .logo-slide",{
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerGroup: 2,
            loop: false, // 슬라이드 루프(무한 회전) 활성화
            spaceBetween: 10,
            slidesPerColumnFill: "row",
            mousewheel: false,
            autoplay: {
                delay: 3000, // 3초마다 자동 재생
                disableOnInteraction: false // 사용자 상호 작용 후에도 자동 재생 유지
            },  
            grid: {
                rows: 2,
                fill: "row" //꼭 있어야 row로 2개씩 작동함!
            },
            speed: 800,
            breakpoints: {
                1280: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    grid: {
                        rows: 2,
                        fill: "row"
                    },
                }
            },
            navigation: {
                nextEl: "#" + thisID + " .swiper-arrow.next",
                prevEl: "#" + thisID + " .swiper-arrow.prev",
            },
        });
    })

    // 카테고리 있을 때  - 카테고리 선택시 해당 카테고리로 이동
    // function logoTab() {
    //     var btn = $(".tab-wrap li a")
    //     , obj = $(".logo-slide-tabbox")
    //     btn.on("click", function(e) {
    //         var t = $(this)
    //         , href = t.attr("href")
    //         e.preventDefault()
    //         btn.parent().removeClass("active")
    //         t.parent().addClass("active")
    //         obj.stop(1, 0).removeClass("active")
    //         obj.filter(href).addClass("active")
    //     });
    // }
    // logoTab()

    // const list = $('.logo-slide-tabbox')
    // // 처음 불러올때 데이터 체크
    // list_load();

    // // 카테고리 버튼 클릭 시 이벤트
    // $(document).on('click', '.tab-wrap li a', function() {
    //     list_load();
    // });

});
