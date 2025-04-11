// jquery 시작
jQuery(document).ready(function ($) {
  // sub_lnb 슬라이더 적용

  /* 지속가능경영(esg) -- 윤리헌장(esg2) */
  // 버튼 클릭시 esg_li 오픈
  $('.esg_ul > .esg_li > .button').on('click', function () {
    if ($(this).parent().hasClass('selected')) {
      $(this).next().slideUp()
      $(this).parent().removeClass('selected')
      $('.esg_li_text').css("display", "")
    } else {
      $('.esg_ul > .esg_li > .button')
      .not($(this))
      .next()
      .slideUp()
      .parent()
      .removeClass('selected');
      $(this).next().slideDown()
      $(this).parent().addClass('selected')
    }
  
    return false
    
  })

  /* 회사소개(company) -- 연혁(company3) */
  // 연혁 index
  $(function(){
    var historyPos = [];
    $('.history').each(function(i,e){
      historyPos.push($(this).offset().top)
    })
    var nav = $('.history_idx').offset().top
    console.log('history:',historyPos)

    // history_idx 연결
    $(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
      if(0 < scrollTop  & scrollTop < historyPos[1]-200){
        $('.history_idx ').find('li').removeClass('on').eq(0).addClass('on')
        // console.log('0')
      } else if(historyPos[1]-200 < scrollTop & scrollTop < historyPos[2] - 200){
        $('.history_idx ').find('li').removeClass('on').eq(1).addClass('on')
        // console.log('1')
      } else if(historyPos[2] -200 < scrollTop){
        $('.history_idx ').find('li').removeClass('on').eq(2).addClass('on')
        // console.log('2')
      } else{

      }
      // console.log('scrollTop  ' + scrollTop)

      // $('.history_idx').on('click', function(){
      //   $('header').addClass('type-2')
      //   if ($('.moblie_nav_btn').hasClass('close')) {
      //     $('body').css("overflow", "scroll");
      //     $('.gnb, .nav, .gnbWrap').addClass('on')
      //     $(this).removeClass('close')
      //     $('.gnb, .nav, .gnbWrap').removeClass('on')
      //     $('header').removeClass('type-2')
      //   } else {
      //     // ('header').removeClass('type-2')
      //     $(this).addClass('close')
      //     $('.nav, .gnbWrap').addClass('on')
      //     // $('body').css("overflow", "hidden");
      //   }
      // })

      // 클릭시 상단 고정
      // $('.history_idx').on('click', function () {
      //   $("#header").addClass("none")
      //   $('.history_idx').css({"padding-top": 0})
      //   // if (window.innerWidth >= 1024) {
      //   //   if($('.history_idx li').hasClass('on')) {
      //   //     $('.idx_list').parent.addClass('on')
      //   //     // $('.history_idx').css({"margin-top": 0})
      //   //     // $('.history_idx',).css({"padding-top": 0})
      //   //     console.log('0찾앗다')
      //   //   } else {
      //   //     console.log('1찾앗다')
      //   //     $('.idx_list').parent.removeClass('on')
      //   //   } 
      //   //   // else if ($('.history_idx li').eq(2).hasClass('on')) {
      //   //   //   console.log('2찾앗다')
      //   //   //   $('.history_idx').css({"margin-top": 80})
      //   //   //   $('.history_idx',).css({"padding-top": 42})
      //   //   // }
      //   // }
      //   // if (window.innerWidth >= 1280) {
      //   //   if(scrollTop < 480) {
      //   //     $('.history_idx').css({"margin-top": 0})
      //   //     $('.history_idx',).css({"padding-top": 0})
      //   //     console.log('480찾앗다')
      //   //   } else if (480 < scrollTop < 645)
      //   //   console.log('645찾앗다')
      //   //   $('.history_idx').css({"margin-top": 0})
      //   //   $('.history_idx',).css({"padding-top": 0})
      //   // }
      // });

      // history_idx 상단 고정 
      // 0 = 850 / 1 = 1395 / 2 = 3011
      if (window.innerWidth >= 360) { 
        $('.history_idx',).css({top: 0})
        // 스크롤시 상단 고정
        if($(header).hasClass("down")){ 
          if(historyPos[0]-180  < scrollTop && scrollTop < historyPos[2]+historyPos[1]+250){
            $('.history_idx',).css({top: scrollTop - historyPos[0] + 200})
          }

        } else {
          if(historyPos[0]-180  < scrollTop && scrollTop < historyPos[2]+historyPos[1]+250){
            $('.history_idx',).css({top: scrollTop - historyPos[0] + 250})
          }
        }
      }

      if (window.innerWidth >= 1024) {
        if(historyPos[0]-50  < scrollTop && scrollTop < historyPos[2] + 400){
          if($(header).hasClass("down")){ 
            console.log("1")
            $('.history_idx',).css({top: (scrollTop - historyPos[0])+ 70})
          } else {
            console.log("2")
            console.log(scrollTop,"scrollTop")
            $('.history_idx',).css({top: (scrollTop - historyPos[0])+ 120})
          }

        } else {
          console.log("3")
          $('.history_idx').css({top: 0})
        }
        
      }

      if (window.innerWidth >= 1280) {
        if(historyPos[0]- 80  < scrollTop && scrollTop < historyPos[2] + 600){
          if($(header).hasClass("down")){ 
            $('.history_idx',).css({top: (scrollTop - historyPos[0])+ 100})
          } else {
            $('.history_idx',).css({top: (scrollTop - historyPos[0])+ 200})
          }

        } else {
          $('.history_idx').css({top: 0})
        }
      }

      window.onresize = function(){
        document.location.reload();
      };
      
    })
  })

  // 연혁 - circle
  const options = {
    root: null, // viewport
    rootMargin: "-10px",
    threshold: 1,  // 50%가 viewport에 들어와 있어야 callback 실행
  }

  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
      entry.target.classList.add('flow');
      } else {
      entry.target.classList.remove('flow');
      }
  });
  }, options);
 
  const boxList = document.querySelectorAll('.history li');
  console.log(boxList)
  // 반복문을 돌려 모든 DOM에 적용
  boxList.forEach(el => observer.observe(el));

  // // 연혁 - 스크롤 속도 제어
  // const top = 6000;
  // const speed = 6000;

  // $('.historyWrap').animate({
  //     scrollTop: top 
  //  }, speed);

  // 인재채용 - 테이블 1행 고정
  // const table_container = document.querySelector('.table');

  // const table       = document.querySelector('table');
  // const table_clone = table.cloneNode(true);
  
  // table_clone.classList.add('clone');
  // table_container.appendChild(table_clone);

  // 오시는 길 - tap
  $('.view1').show();
	$('.off_box').click(function(){
    $(window).resize(function(){document.location.reload();})
		$(this).siblings('.off_box').removeClass('on');
		$(this).addClass('on');
		var index = $(this).index()+1;
		$(this).parent('.office_tap').siblings('.office').hide();
		$(this).parent('.office_tap').siblings('.view'+ index).show();
	});

  // 홍보센터 - 영상
  $(".video-slide").each(function() {
    var thisID = $(this).parent().attr("id")
    var logoSwiper = new Swiper("#" + thisID + " .video-slide",{
        loop: false, // 슬라이드 루프(무한 회전) 활성화
        spaceBetween: 10,
        slidesPerColumnFill: "row",
        mousewheel: false,
        autoplay: false,
        speed: 800,
        breakpoints: {
            700: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1100: {
              slidesPerView: 3,
              slidesPerGroup: 3,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 2,
        }
        },
        navigation: {
            nextEl: ".video-arrow.next",
            prevEl: ".video-arrow.prev",
        },
    });
  })

  //서비스 sub_lnb slick
  // $('#sub_slick > .slick_wrap').slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // });

  // $('.post-wrapper').slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  // });

  // 문의하기 - 글자수 세기 및 제한
  $('#form-keyup').keyup(function (e) {
    let content = $(this).val();
      
      // 글자수 세기
      if (content.length == 0 || content == '') {
        $('.textCount').text('0자');
      } else {
        $('.textCount').text(content.length + '자');
      }
      
      // 글자수 제한
      if (content.length > 1500) {
        // 1500자 부터는 타이핑 되지 않도록
          $(this).val($(this).val().substring(0, 1500));
          // 1500자 넘으면 알림창 뜨도록
          alert('글자수는 1500자까지 입력 가능합니다.');
      };
  });

  // form - email 연결
  // $('#selectEmail').change(function(){
  //   $("#selectEmail option:selected").each(function () {
     
  //    if($(this).val()== '1'){ //직접입력일 경우
  //       $("#str_email02").val(''); //값 초기화
  //       $("#str_email02").attr("disabled",false); //활성화
  //    }else{ //직접입력이 아닐경우
  //       $("#str_email02").val($(this).text()); //선택값 입력
  //       $("#str_email02").attr("disabled",true); //비활성화
  //    }
  //   });
  // });

  // form - 내용 글자수 체크
  $(document).ready(function() {
    $('#substance').on('keyup', function() {
        $('#text_cnt').html("("+$(this).val().length+"/300)");
 
        if($(this).val().length > 300) {
            $(this).val($(this).val().substring(0, 300));
            $('#text_cnt').html("300/300");
        }
    });
  });

});// jquery 끝