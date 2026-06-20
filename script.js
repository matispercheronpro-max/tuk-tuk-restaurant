(function () {
  var root = document.getElementById('root');
  var nav = document.getElementById('site-nav');
  if (!root) return;

  var els = root.querySelectorAll('[data-reveal]');
  var vh = window.innerHeight || 800;

  els.forEach(function (el, idx) {
    var top = el.getBoundingClientRect().top;
    if (top < vh * 0.9) return; // already visible: leave as-is
    el.classList.add('reveal-hidden');
    var delay = (idx % 3) * 0.06;
    el.style.transitionDelay = delay + 's';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  els.forEach(function (el) {
    if (el.classList.contains('reveal-hidden')) io.observe(el);
  });

  setTimeout(function () {
    els.forEach(function (el) { el.classList.remove('reveal-hidden'); });
  }, 2200);

  if (nav) {
    var onScroll = function () {
      nav.style.boxShadow = window.scrollY > 12
        ? '0 1px 0 var(--line), 0 14px 34px -24px rgba(40,28,18,.5)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
