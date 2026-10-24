$(function () {
  var PEEK = 90; // px of previous thumb visible (faded) on the left

  var thumbsSwiper = new Swiper(".thumbs-swiper", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    grabCursor: true,
    spaceBetween: 8,
    breakpoints: {
      // offset keeps a faded peek of the previous thumb on the left
      768: { spaceBetween: 14, slidesOffsetBefore: PEEK },
    },
    on: {
      // trailing space lets every thumb snap to the left offset, even the last ones
      resize: updateTrailingOffset,
      afterInit: updateTrailingOffset,
    },
  });

  function updateTrailingOffset(swiper) {
    var isDesktop = window.innerWidth >= 768;
    var slideW = swiper.slides.length ? swiper.slides[0].offsetWidth : 0;
    swiper.params.slidesOffsetAfter = isDesktop
      ? Math.max(0, swiper.width - slideW - PEEK)
      : 0;
    swiper.updateSlides();
  }

  var heroSwiper = new Swiper(".hero-swiper", {
    speed: 600,
    rewind: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".hero-btn--prev",
      nextEl: ".hero-btn--next",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
    on: {
      // keep active thumb snapped at the offset so the previous thumb peeks in the faded zone
      slideChange: function () {
        var idx = this.activeIndex;
        // defer so it runs after the thumbs module's own scroll
        setTimeout(function () {
          thumbsSwiper.slideTo(idx);
        }, 0);
      },
    },
  });
});
