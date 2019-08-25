(function init() {
    // Pages of the homepage
    const $slides = document.querySelectorAll(".slide");
    const $pages = document.querySelectorAll(".page");
    const $portfolio = document.querySelector(".portfolio");
    const backgrounds = [
        `radial-gradient(#2B3760, #0B1023)`,
        `radial-gradient(#4E3022, #161616)`,
        `radial-gradient(#4E4342, #0B1023)`
    ];
    // Menu
    const $burger = document.querySelector(".menu");
    const $burgerLines = document.querySelectorAll('.menu line');
    const $navOpen = document.querySelector(".nav-open");
    const $contact = document.querySelector(".contact");
    const $social = document.querySelector(".social");
    const $logo = document.querySelector(".logo");

    // Trackers
    let current = 0;
    let scrollSlide = 0;

    // Change the opacity of the dots
    function changeDot(dot) {
        $slides.forEach(slide => {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    // Change the content between the slides
    function nextSlide(pageNumber) {
        const nextPage = $pages[pageNumber];
        const currentPage = $pages[current];

        const nextLeft = nextPage.querySelector(".hero .img-left");
        const nextRight = nextPage.querySelector(".hero .img-right");
        const currentLeft = currentPage.querySelector(".hero .img-left");
        const currentRight = currentPage.querySelector(".hero .img-right");
        const nextText = nextPage.querySelector(".details");

        const tl = new TimelineMax({
            onStart: function() {
                $slides.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                });
            },
            onComplete: function() {
                $slides.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                });
            }
        });
    
        tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
          .fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')
          .to($portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
          .fromTo(currentPage, 0.3, {opacity:1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})
          .fromTo(nextPage, 0.3, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all' }, '-=0.6')
          .fromTo(nextLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.6')
          .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.8')
          .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, {opacity: 1, y: 0})
          .set(nextLeft, {clearProps: "all"})
          .set(nextRight, {clearProps: "all"})
          
          current = pageNumber;
    }

    $slides.forEach((slide, index) => {
        slide.addEventListener("click", function() {
            changeDot(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    // Detect wheel event
    function switchDots(dotNumber) {
        const activeDot = $slides[dotNumber];
        changeDot(activeDot);
    }

    function throttled(fn, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        }
    }

    function scrollChange(wheelEvent) {
       if(wheelEvent.deltaY > 0) {
          scrollSlide += 1;
       } else {
           scrollSlide -= 1;
       }

       if(scrollSlide > 2) {
          scrollSlide = 0;
       }
       if(scrollSlide < 0) {
           scrollSlide = 2;
       }
       switchDots(scrollSlide);
       nextSlide(scrollSlide);
    }

    document.addEventListener('wheel', throttled(scrollChange, 1600));
    document.addEventListener('touchmove', throttled(scrollChange, 1600));

    // Menu
    const tl = new TimelineMax({ paused: true, reversed: true });

    tl.to($navOpen, 0.5, { y:0 })
      .fromTo($contact, 0.5, { opacity: 0, y: 10}, { opacity:1, y: 0 }, "-=0.1")
      .fromTo($social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
      .fromTo($logo, 0.5, { color: 'white' }, { color: 'black'}, '-=1')
      .fromTo($burgerLines, 0.2, { stroke: "white" }, { stroke: "black"}, "-=1")

    $burger.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
})()