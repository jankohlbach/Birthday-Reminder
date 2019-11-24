// scroll-to-top function
const scrollToTop = function scrollToTop() {
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  const endPoint = 0;
  const duration = 600;

  const scroll = function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    window.scroll(0, Math.ceil(timeFunction * (endPoint - start) + start));

    if (window.pageYOffset === endPoint) {
      return;
    }

    requestAnimationFrame(scroll);
  };

  scroll();
};

export default scrollToTop;
