/**
 * BOKE HiScene - Main JavaScript
 */

(function () {
  'use strict';

  // === Language Switching ===
  let currentLang = localStorage.getItem('hiscene-lang') || 'zh';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('hiscene-lang', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[key] && I18N[key][lang]) {
        el.textContent = I18N[key][lang];
      }
    });

    // Update elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (I18N[key] && I18N[key][lang]) {
        el.placeholder = I18N[key][lang];
      }
    });

    // Update elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (I18N[key] && I18N[key][lang]) {
        el.innerHTML = I18N[key][lang];
      }
    });

    // Update active state on language switcher buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'de' ? 'de' : 'en';
  }

  function initLanguage() {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });
    applyLanguage(currentLang);
  }

  // === Header Scroll Effect ===
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // === Mobile Menu ===
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // === Tabs ===
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabContainer => {
      const buttons = tabContainer.querySelectorAll('.tab-btn');
      const parentSection = tabContainer.closest('.section') || tabContainer.parentElement;
      const contents = parentSection.querySelectorAll('.tab-content');

      const wrapper = parentSection.querySelector('.products-wrapper');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');

          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          if (wrapper) {
            wrapper.classList.toggle('show-all', target === 'all');
          }

          contents.forEach(content => {
            if (target === 'all') {
              content.classList.add('active');
            } else {
              content.classList.toggle('active', content.getAttribute('data-tab-content') === target);
            }
          });
        });
      });
    });
  }

  // === Active Nav Link ===
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // === Scroll Animations (simple fade-in) ===
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .product-card, .case-card, .advantage-item, .strategy-item, .scene-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // === Init ===
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initHeaderScroll();
    initMobileMenu();
    initTabs();
    initActiveNav();
    initScrollAnimations();
  });
})();
