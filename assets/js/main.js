/* ==========================================================================
   Anjali Talan — Portfolio
   Vanilla JS, no dependencies. Every module is independent and fails quietly.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  (function theme() {
    var btn = $('#themeToggle');
    if (!btn) return;
    var root = document.documentElement;

    function label() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    label();

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('at-theme', next); } catch (e) {}
      label();
    });

    // Follow the OS only while the visitor has not made an explicit choice.
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('at-theme'); } catch (err) {}
      if (saved) return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      label();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  })();

  /* ---------- Mobile navigation ---------- */
  (function nav() {
    var toggle = $('#navToggle');
    var panel  = $('#nav');
    var scrim  = $('#navScrim');
    if (!toggle || !panel || !scrim) return;

    function open() {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      scrim.hidden = false;
      void scrim.offsetWidth;
      scrim.classList.add('is-open');
      document.body.classList.add('is-locked');
    }
    function close() {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      scrim.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () {
        if (!scrim.classList.contains('is-open')) scrim.hidden = true;
      }, 280);
    }

    toggle.addEventListener('click', function () {
      panel.classList.contains('is-open') ? close() : open();
    });
    scrim.addEventListener('click', close);
    $$('.nav__link, .nav__footer a', panel).forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) { close(); toggle.focus(); }
    });
    // Leaving the mobile breakpoint should never strand the page in a locked state.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920 && panel.classList.contains('is-open')) close();
    });
  })();

  /* ---------- Sticky header, scroll progress, back-to-top ---------- */
  (function scrollUi() {
    var header  = $('#header');
    var bar     = $('#progressBar');
    var toTop   = $('#toTop');
    var ticking = false;

    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle('is-stuck', y > 8);
      if (toTop)  toTop.classList.toggle('is-visible', y > 620);
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
  })();

  /* ---------- Scroll spy ---------- */
  (function spy() {
    var links = $$('.nav__link');
    if (!links.length) return;

    var items = [];
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var sec = document.getElementById(href.slice(1));
      if (sec) items.push({ link: link, sec: sec });
    });
    if (!items.length) return;

    var OFFSET = 96;   // just below the sticky header
    var current = null;

    // Deliberately NOT IntersectionObserver ratios: intersectionRatio is relative
    // to each section's own height, so a short section scores ~1.0 while a tall
    // one scores ~0.05 for the same screen coverage. Ratios across sections of
    // different heights are not comparable. Compare scroll position instead.
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var line = y + OFFSET;
      var active = items[0];

      for (var i = 0; i < items.length; i++) {
        var top = items[i].sec.getBoundingClientRect().top + y;
        if (top <= line) active = items[i];
      }
      // The last section may be too short to ever reach the line.
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 2) {
        active = items[items.length - 1];
      }

      if (active === current) return;
      current = active;
      items.forEach(function (it) { it.link.classList.toggle('is-active', it === active); });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  })();

  /* ---------- Reveal on scroll ---------- */
  (function reveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = e.target.getAttribute('data-reveal-delay');
        if (d) e.target.style.setProperty('--reveal-delay', d + 'ms');
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .08 });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Animated stat counters ---------- */
  (function counters() {
    var nums = $$('.stat__num');
    if (!nums.length) return;

    function render(el, value) {
      el.textContent = (el.dataset.prefix || '') + value + (el.dataset.suffix || '');
    }
    function run(el) {
      var target = parseFloat(el.dataset.count);
      if (isNaN(target)) return;
      // The final value is already in the HTML, so it stays correct without JS.
      if (reduceMotion) { render(el, target); return; }

      var dur = 1500, start = null;
      render(el, 0);
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);           // ease-out cubic
        render(el, Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: .5 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Generic filter (projects + certifications) ---------- */
  function makeFilter(opts) {
    var grid = $(opts.grid);
    if (!grid) return;
    var buttons = $$('[' + opts.attr + ']');
    var cards   = $$(opts.card, grid);
    var empty   = opts.empty ? $(opts.empty) : null;

    function apply(value) {
      var shown = 0;
      cards.forEach(function (card) {
        var tokens = (card.getAttribute(opts.data) || '').split(/\s+/);
        var match = value === 'all' || tokens.indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        apply(btn.getAttribute(opts.attr));
      });
    });
  }

  makeFilter({
    grid: '#projectGrid', card: '.card--project', data: 'data-cat',
    attr: 'data-filter', empty: '#projectEmpty'
  });
  makeFilter({
    grid: '#certGrid', card: '.card--cert', data: 'data-issuer',
    attr: 'data-cert-filter', empty: '#certEmpty'
  });

  /* ---------- Project modal ---------- */
  (function modal() {
    var root = $('#modal');
    if (!root) return;

    var panel   = $('.modal__panel', root);
    var thumb   = $('#modalThumb');
    var kicker  = $('#modalKicker');
    var title   = $('#modalTitle');
    var type    = $('#modalType');
    var content = $('#modalContent');
    var lastFocused = null;

    function open(card) {
      var tmpl   = $('.card__detail', card);
      var srcSvg = $('.thumb', card);

      thumb.innerHTML = srcSvg ? srcSvg.outerHTML : '';
      kicker.textContent = (($('.card__kicker', card) || {}).textContent || '').trim();
      title.textContent  = (($('.card__title',  card) || {}).textContent || '').trim();
      type.textContent   = (($('.card__type',   card) || {}).textContent || '').trim();
      content.innerHTML  = '';
      if (tmpl) content.appendChild(tmpl.content.cloneNode(true));

      lastFocused = document.activeElement;
      root.hidden = false;
      document.body.classList.add('is-locked');
      panel.scrollTop = 0;
      // Flush layout so the opening transition runs from the hidden state.
      // A forced reflow is used instead of rAF, which never fires in a
      // background tab and would leave the dialog stuck at opacity 0.
      void root.offsetWidth;
      root.classList.add('is-open');
      var closeBtn = $('.modal__close', root);
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      root.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () {
        if (!root.classList.contains('is-open')) root.hidden = true;
      }, 280);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    $$('.card--project').forEach(function (card) {
      card.addEventListener('click', function () { open(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
      });
    });

    $$('[data-close]', root).forEach(function (el) { el.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (root.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;

      // Keep keyboard focus inside the dialog while it is open.
      var focusables = $$('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])', panel)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  /* ---------- Copy to clipboard ---------- */
  (function copy() {
    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var text = btn.getAttribute('data-copy');

        var done = function () {
          btn.classList.add('is-done');
          toast('Copied to clipboard');
          window.setTimeout(function () { btn.classList.remove('is-done'); }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { toast(text); });
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.cssText = 'position:absolute;left:-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (err) { toast(text); }
          document.body.removeChild(ta);
        }
      });
    });
  })();

  /* ---------- Credential placeholder links ---------- */
  (function credentials() {
    $$('[data-credential]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (a.getAttribute('href') === '#') {
          e.preventDefault();
          toast('Credential link not added yet');
        }
      });
    });
  })();

  /* ---------- Contact form → mailto ---------- */
  (function form() {
    var f = $('#contactForm');
    if (!f) return;
    var status = $('#formStatus');
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(field, msg) {
      var wrap = field.closest('.field');
      var box  = $('.field__error', wrap);
      wrap.classList.toggle('has-error', !!msg);
      if (box) box.textContent = msg || '';
      return !msg;
    }

    function validate(field) {
      var v = field.value.trim();
      if (field.id === 'cf-name')    return setError(field, v ? '' : 'Please enter your name.');
      if (field.id === 'cf-email')   return setError(field, !v ? 'Please enter your email address.' : (EMAIL_RE.test(v) ? '' : 'That does not look like a valid email address.'));
      if (field.id === 'cf-message') return setError(field, v ? '' : 'Please write a short message.');
      return true;
    }

    // Validate on blur, and clear the error as soon as the visitor starts fixing it.
    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var field = $('#' + id);
      if (!field) return;
      field.addEventListener('blur', function () { validate(field); });
      field.addEventListener('input', function () {
        if (field.closest('.field').classList.contains('has-error')) validate(field);
      });
    });

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['cf-name', 'cf-email', 'cf-message'].map(function (id) { return $('#' + id); });
      var ok = true, firstBad = null;

      fields.forEach(function (field) {
        if (!validate(field)) { ok = false; if (!firstBad) firstBad = field; }
      });
      if (!ok) {
        if (status) status.textContent = 'Please fix the highlighted fields.';
        if (firstBad) firstBad.focus();
        return;
      }

      var name    = $('#cf-name').value.trim();
      var email   = $('#cf-email').value.trim();
      var subject = ($('#cf-subject').value || '').trim() || ('Portfolio enquiry from ' + name);
      var message = $('#cf-message').value.trim();
      var body    = message + '\n\n—\n' + name + '\n' + email;

      window.location.href = 'mailto:anjali.talan.ofc@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      if (status) status.textContent = 'Opening your mail app… if nothing happens, email anjali.talan.ofc@gmail.com directly.';
      toast('Opening your mail app');
    });
  })();

  /* ---------- Portrait fallback ---------- */
  (function portrait() {
    var img   = $('#portraitImg');
    var frame = img && img.closest('.portrait__frame');
    if (!img || !frame) return;

    var fail = function () { frame.classList.add('no-img'); };
    img.addEventListener('error', fail);
    // Covers a cached 404 that fires before this script runs.
    if (img.complete && img.naturalWidth === 0) fail();
  })();

  /* ---------- Footer year ---------- */
  (function year() {
    var el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  })();

})();
