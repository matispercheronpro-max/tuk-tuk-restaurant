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

  var burger = document.getElementById('nav-burger');
  var panel = document.getElementById('mobile-panel');
  var backdrop = document.getElementById('panel-backdrop');
  var panelClose = document.getElementById('panel-close');
  if (burger && panel && backdrop) {
    var openPanel = function () {
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    var closePanel = function () {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', openPanel);
    backdrop.addEventListener('click', closePanel);
    if (panelClose) panelClose.addEventListener('click', closePanel);
    panel.querySelectorAll('[data-panel-link]').forEach(function (a) {
      a.addEventListener('click', closePanel);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
  }

  var avisTrack = document.getElementById('avis-track');
  var avisPrev = document.querySelector('.avis-arrow-prev');
  var avisNext = document.querySelector('.avis-arrow-next');
  if (avisTrack && avisPrev && avisNext) {
    var scrollAvis = function (dir) {
      var card = avisTrack.querySelector('.avis-card');
      var amount = card ? card.getBoundingClientRect().width + 20 : avisTrack.clientWidth * 0.85;
      avisTrack.scrollBy({ left: dir * amount, behavior: 'smooth' });
    };
    avisPrev.addEventListener('click', function () { scrollAvis(-1); });
    avisNext.addEventListener('click', function () { scrollAvis(1); });
  }
})();
