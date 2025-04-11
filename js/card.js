//카드 슬라이드 - 배경 및 카드 전환
(() => {
  const PERCENT_THRESHOLD = new Array(100).fill(0).map((value, index) => (index + 1) * 0.01);

  function setFadeIn() {
    const $targets = document.querySelectorAll("[data-ani-fade-in]");
    const options = { root: null, threshold: 0.38, rootMargin: "0px" };
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-ani-fade-in', 'play');
        }
      });
    }, options);

    $targets.forEach($target => {
      observer.observe($target);
    });
  }

  function setFadeLeft() {
    const $targets = document.querySelectorAll("[data-ani-fade-left]");
    const options = { root: null, threshold: 0.38, rootMargin: "0px" };
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-ani-fade-left', 'play');
        }
        if(window.innerWidth <= 1024) {
          entry.target.setAttribute('data-ani-fade-left', '');
        }
      });
    }, options);

    $targets.forEach($target => {
      observer.observe($target);
    });
  }

  function setUp() {
    const $targets = document.querySelectorAll('[data-ani-up]');
    const options = { root: null, threshold: PERCENT_THRESHOLD, rootMargin: "70% 0px 0px" };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.2) {
          entry.target.setAttribute('data-ani-up', 'play');
        }
      });
    }, options);

    $targets.forEach($target => {
      observer.observe($target);
    });
  }

  function setScrollBar() {
    const $scrollBar = document.querySelector('#scrollBar');
    const $backgroundObserveEl = document.querySelector('#backgroundTriggerEl');
    const options = { root: null, threshold: PERCENT_THRESHOLD, rootMargin: "-90% 0px 0px 0px" };
    if($scrollBar && window.innerWidth < 768) {
      options.rootMargin = "-32px";
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if ($scrollBar) {
          $scrollBar.style.visibility = entry.intersectionRatio < 0.01 ? 'hidden' : 'visible';
          $scrollBar.style.opacity = entry.intersectionRatio < 0.01 ? '0' : '1';
        }
        if($scrollBar && window.innerWidth < 768) {
          $scrollBar.style.visibility = entry.intersectionRatio < 0.01 ? 'hidden' : 'visible';
          $scrollBar.style.opacity = entry.intersectionRatio < 0.01 ? '0' : '1';
        }
      });
    }, options);

    observer.observe($backgroundObserveEl);

  }

  function getCardInfo() {
    const $fixedScroll = document.querySelector('#fixedScroll');
    const $cards = $fixedScroll.querySelectorAll('.card');
    const st = window.scrollY;

    return [...$cards].map((card, index) => ({
      cardEl: card,
      cardPosInfo: card.getBoundingClientRect().top + st,
      cardPosTop: card.getBoundingClientRect().top,
      indexNum: index + 1,
    }));
  }


  function cardOpacity() {
    const $targets = document.querySelectorAll('.card');
    const options = { root: null, threshold: PERCENT_THRESHOLD,rootMargin: "70% 0px 0px"  };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(window.innerWidth < 768) {
          const opacity = (entry.intersectionRatio) * 100 + '%';
          entry.target.style.opacity = opacity;
        } else {
          entry.target.style.opacity = '1';
        }
      });
    }, options);

    $targets.forEach($target => {
      observer.observe($target);
    });
  }



  function heightChange() {
    const $fixedScroll = document.querySelector('#fixedScroll');
    if(window.innerWidth >= 768) {
      $fixedScroll.style.height = '1300px';
    }

    if(window.innerWidth < 768) {
      $fixedScroll.style.height = '1300px';
    }
  }


  function testScroll() {
    const cards = getCardInfo();
    const $fixedScroll = document.querySelector('#fixedScroll');
    const winScrollTop = window.scrollY + window.innerHeight * .2;
    let $posFromTop = $fixedScroll.getBoundingClientRect().top;
    let $secBody = document.querySelector('.growth_section .section_body');

    if(window.innerWidth < 768) {
      cards.forEach((card) => {
        card.cardPosInfo -= 80;
      });
    }

    const clearCardActive = () => {
      cards.forEach((card) => {
        card.cardEl.classList.remove('is_active');
        $fixedScroll.classList.remove(`is_active${card.indexNum}`);
      });
    };

    for(let i = cards.length - 1; i>=0; i--) {
      // console.log(cards[i].cardPosInfo)
      // console.log(cards[i].cardEl)
      // console.log(cards[i].cardPosTop)

      if(cards[i].cardPosInfo <= winScrollTop) {
        if(window.innerWidth < 768 && cards[i].cardPosInfo <= winScrollTop) {
          cards[i].cardEl.style.opacity = cards[i].cardPosTop / 500 -0.05;
        }
      }
      if(window.innerWidth <= 1024) {
        if(cards[i].cardPosInfo-150 <= winScrollTop) {
          clearCardActive();
          cards[i].cardEl.classList.add('is_active');
          $fixedScroll.classList.add(`is_active${cards[i].indexNum}`)
          break
        }
      } else if(window.innerWidth < 768) {
        if(cards[i].cardPosInfo <= winScrollTop) {
          clearCardActive();
          cards[i].cardEl.classList.add('is_active');
          $fixedScroll.classList.add(`is_active${cards[i].indexNum}`)
          break
        }
      }
      else{
        if (cards[i].cardPosInfo <= winScrollTop) {
          clearCardActive();
          cards[i].cardEl.classList.add('is_active');
          $fixedScroll.classList.add(`is_active${cards[i].indexNum}`)
          break
        }
      }
    }
    if(window.innerWidth >= 768) {
      if ($posFromTop <= 0) {
        $secBody.style.transform = 'translate3d(0,' + ($posFromTop * 0.05) + '%,0)';
      }
      if($posFromTop * 0.05 <= -60) {
        $secBody.style.transform = 'translate3d(0,' + -(60) + '%,0)';
      }
    }
    if(window.innerWidth < 768) {
      if ($posFromTop <= 0) {
        $secBody.style.transform = 'translate3d(0,' + ($posFromTop * 0.05) + '%,0)';
      }
      if($posFromTop * 0.05 <= -92) {
        $secBody.style.transform = 'translate3d(0,' + -(92) + '%,0)';
      }
    }
    else {
      if ($posFromTop <= 0) {
        $secBody.style.transform = 'translate3d(0,' + ($posFromTop * 0.05) + '%,0)';
      }
      if($posFromTop * 0.05 <= -72) {
        $secBody.style.transform = 'translate3d(0,' + -(72) + '%,0)';
      }
    }
  }

  document.addEventListener('scroll', () => {
    testScroll();
  })

  document.addEventListener("DOMContentLoaded", () => {
    setUp();
    setFadeIn();
    setFadeLeft();
    heightChange();
    cardOpacity();
  });


})();

//카드 컨텐츠 - header 고정
$(window).resize(function(){ 

  let scrollTop = '';
  let wrapH = ''; //모든 컨텐츠 높이
  let mvH = ''; //mv 높이
  let cardH = ''; //content1 높이
  let footerH = ''; //footer 높이
  let elemT = '';
  $(window).on('scroll', function() {
      scrollTop = $(window).scrollTop(); //현재 스크롤 위치
      wrapH = $('.body').height(); //모든 컨텐츠 높이
      mvH = $('.con').height(); //mv 높이
      cardH =$('.growth_section').height(); //content2 높이
      footerH = $('footer').height(); //footer 높이
      elemT=1400;

      // console.log("scroll : ", scrollTop);
      // console.log("main:" ,wrapH);
      // console.log("cardh:" ,cardH);
      // console.log("mvh:" ,mvH);
      // console.log("footer:" ,footerH); 

      if (window.innerWidth >= 360) { 
        if (scrollTop >= mvH && scrollTop <= elemT){
          // console.log('고정');
          $('.section_head').css({'position':'fixed', 'top':'78px'})
          $('.section_head > .card_sub').css({'padding-right':'30px'})
        } else if (scrollTop < cardH || scrollTop > cardH){
          // console.log('고정안함');
          $('.section_head').css({'position':'sticky'})
          $('.section_head > .card_sub').css({'padding-right':'0px' })
        }
      }

      if (window.innerWidth >= 768) {
        if (scrollTop >= (mvH-50) && scrollTop <= cardH + 200){
          // console.log('고정할게요');
          $('.section_head').css({'position':'fixed', 'top':'78px'})
          $('.section_head > .card_sub').css({'padding-right':'20px'})
        } else if (scrollTop < cardH || scrollTop > (cardH)){
            // console.log('고정안해요');
            $('.section_head').css({'position':'sticky' })
            $('.section_head > .card_sub').css({'padding-right':'0px'})
        } 
      }

      if (window.innerWidth >= 1280) {
        if (scrollTop >= (mvH-50) && scrollTop <= cardH + 200){
          // console.log('고정할래');
          $('.section_head').css({'position':'fixed', 'top':'150px'})
        } else if (scrollTop < cardH || scrollTop > (cardH)){
            // console.log('고정안할래');
            $('.section_head').css({'position':'sticky'})
        }
      }
    }
         

)}).resize();