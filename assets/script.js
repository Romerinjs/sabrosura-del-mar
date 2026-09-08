/* =============================================================
   La Sabrosura del Mar — JS de interfaz
   Sin dependencias. Vanilla JS.
   ============================================================= */
(function () {
  'use strict';

  /* ---------- 1. Header con sombra al hacer scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ---------- 3. Animación de entrada ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (!('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- 4. Carta: categoría activa en la barra sticky ---------- */
  var navLinks = document.querySelectorAll('.menu-nav__scroll a');
  var sections = document.querySelectorAll('.menu-section[id]');
  if (navLinks.length && sections.length) {
    var setActive = function (id) {
      navLinks.forEach(function (a) {
        var active = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', active);
        if (active && a.parentElement) {
          var box = a.parentElement.getBoundingClientRect();
          var el = a.getBoundingClientRect();
          if (el.left < box.left || el.right > box.right) {
            a.parentElement.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
          }
        }
      });
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 5. Carta: buscador ---------- */
  var search = document.getElementById('menu-search');
  if (search) {
    var items = Array.prototype.slice.call(document.querySelectorAll('.menu-item'));
    var allSections = Array.prototype.slice.call(document.querySelectorAll('.menu-section'));
    var empty = document.querySelector('.menu-empty');

    var normalize = function (s) {
      return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    var filter = function () {
      var q = normalize(search.value.trim());
      var found = 0;

      items.forEach(function (item) {
        var match = !q || normalize(item.textContent).indexOf(q) !== -1;
        item.classList.toggle('is-hidden', !match);
        if (match) found++;
      });

      allSections.forEach(function (section) {
        var visible = section.querySelectorAll('.menu-item:not(.is-hidden)').length;
        section.style.display = (q && visible === 0) ? 'none' : '';
        var feat = section.querySelector('.menu-feature');
        if (feat) feat.style.display = q ? 'none' : '';
      });

      if (empty) empty.classList.toggle('is-visible', q && found === 0);
    };

    search.addEventListener('input', filter);
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { search.value = ''; filter(); }
    });
  }

  /* ---------- 6. Año dinámico en el footer ---------- */
  var year = document.querySelectorAll('[data-year]');
  year.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
