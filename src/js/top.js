/*
 * top button animation
**/

const topButton = {
  init () {
    this.cacheDOM();
    this.bindEvent();
  },
  cacheDOM () {
    this.top = $('.top');
    if (!$('.schedule').length) {
      return;
    } else {
      this.target = $('.schedule').offset().top;
    }
    this.timeout = null;
  },
  bindEvent () {
    $(window).scroll(this.listenForScroll.bind(this));
    this.top.on('click', this.handleScrollToTop.bind(this));
  },
  handleScrollToTop () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  listenForScroll () {
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.timeout = null;
        if ($(window).scrollTop() >= this.target) {
          this.top
            .removeClass('hidden')
            .addClass('visible');
        } else {
          this.top
            .removeClass('visible')
            .addClass('hidden');
        }
      }, 250);
    }
  }
}
topButton.init();
