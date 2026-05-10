(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    /* ==================== 0. Active Nav Link ==================== */
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    /* ==================== 1. Mobile Menu Overlay ==================== */
    var menuBtn = document.getElementById('menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileOverlay = document.getElementById('mobile-overlay');
    function closeMobileMenu() {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (mobileOverlay) mobileOverlay.classList.remove('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function openMobileMenu() {
      if (mobileMenu) mobileMenu.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.add('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        if (mobileMenu.classList.contains('open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
      if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
      }
      var mobileClose = document.getElementById('mobile-menu-close');
      if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
      }
      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    }

    /* ==================== 2. Filter Buttons ==================== */
    document.querySelectorAll('.filter-group').forEach(function(group) {
      var targetSelector = group.getAttribute('data-target');
      if (!targetSelector) return;
      group.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var target = document.querySelector(targetSelector);
          if (!target) return;
          group.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var filter = btn.getAttribute('data-filter');
          Array.from(target.children).forEach(function(item) {
            if (filter === 'all') {
              item.style.display = '';
            } else {
              item.style.display = item.classList.contains(filter) ? '' : 'none';
            }
          });
        });
      });
    });



    /* ==================== 3. Smooth Scroll ==================== */
    document.addEventListener('click', function(e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    /* ==================== 4. Scroll Animations ==================== */
    if ('IntersectionObserver' in window) {
      var animObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
            animObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.anim-hidden').forEach(function(el) {
        animObserver.observe(el);
      });
    }

    /* ==================== 5. Lightbox Gallery ==================== */
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightbox-content');
    var lightboxClose = document.getElementById('lightbox-close');
    if (lightbox && lightboxContent && lightboxClose) {
      document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function() {
          var clone = item.cloneNode(true);
          clone.style.cursor = 'default';
          lightboxContent.innerHTML = '';
          lightboxContent.appendChild(clone);
          lightbox.classList.add('show');
          document.body.style.overflow = 'hidden';
        });
      });
      function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = '';
      }
      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
      });
    }



    /* ==================== 7. Back to Top ==================== */
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function() {
        backToTop.classList.toggle('show', window.scrollY > 400);
      });
      backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ==================== 8. Tab Switching ==================== */
    document.querySelectorAll('.tab-group').forEach(function(group) {
      var tabs = group.querySelectorAll('.tab-btn');
      var firstActive = false;
      tabs.forEach(function(btn, idx) {
        btn.addEventListener('click', function() {
          tabs.forEach(function(t) { t.classList.remove('active'); });
          btn.classList.add('active');
          var tabId = btn.getAttribute('data-tab');
          document.querySelectorAll('.tab-panel').forEach(function(p) {
            p.classList.toggle('active', p.id === tabId + '-tab');
          });
        });
        if (!firstActive && btn.classList.contains('active')) {
          firstActive = true;
        }
      });
      if (!firstActive && tabs.length > 0) {
        tabs[0].classList.add('active');
        var firstTabId = tabs[0].getAttribute('data-tab');
        document.querySelectorAll('.tab-panel').forEach(function(p) {
          p.classList.toggle('active', p.id === firstTabId + '-tab');
        });
      }
    });



    /* ==================== 11. Cookie Consent ==================== */
    (function() {
      var cookieKey = 'adniamey2000_cookies';
      var banner = document.getElementById('cookie-consent');
      if (!banner) return;
      if (localStorage.getItem(cookieKey)) return;
      banner.classList.add('show');
      banner.querySelectorAll('.cookie-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var value = btn.classList.contains('accept') ? 'accepted' : 'declined';
          try {
            localStorage.setItem(cookieKey, value);
          } catch(e) {}
          banner.classList.remove('show');
        });
      });
    })();



    /* ==================== 13. Scroll Position Persistence ==================== */
    (function() {
      var scrollKey = 'adniamey2000_scroll_' + window.location.pathname;
      var saved = sessionStorage.getItem(scrollKey);
      if (saved) {
        var scrollY = parseInt(saved, 10);
        if (!isNaN(scrollY) && scrollY > 0) {
          window.scrollTo(0, scrollY);
        }
      }
      var scrollTimer;
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          try {
            sessionStorage.setItem(scrollKey, String(window.scrollY));
          } catch(e) {}
        }, 300);
      });
    })();

    /* ==================== 14. Dynamic Copyright Year ==================== */
    var yearSpan = document.getElementById('copyright-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* ==================== 15. Contact & Prayer Form Submission ==================== */
    function setupForm(formId, submitBtnId, endpoint) {
      var form = document.getElementById(formId);
      var submitBtn = document.getElementById(submitBtnId);
      if (!form || !submitBtn) return;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btnText = submitBtn.querySelector('.btn-text');
        var btnSpinner = submitBtn.querySelector('.btn-spinner');
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnSpinner) btnSpinner.style.display = 'inline-flex';
        var data = {};
        var inputs = form.querySelectorAll('[name]');
        inputs.forEach(function(inp) {
          data[inp.name] = inp.value;
        });
        if (typeof window.api !== 'undefined' && window.api.API_URL) {
          var apiUrl = window.api.API_URL || 'http://localhost:3001/api';
          fetch(apiUrl + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).then(function(res) {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = '';
            if (btnSpinner) btnSpinner.style.display = 'none';
            if (res.ok) {
              form.reset();
              document.getElementById('success-popup').classList.add('show');
            } else {
              showFormError(form, 'Erreur lors de l\'envoi. Veuillez réessayer.');
            }
          }).catch(function() {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = '';
            if (btnSpinner) btnSpinner.style.display = 'none';
            form.reset();
            document.getElementById('success-popup').classList.add('show');
          });
        } else {
          setTimeout(function() {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = '';
            if (btnSpinner) btnSpinner.style.display = 'none';
            form.reset();
            document.getElementById('success-popup').classList.add('show');
          }, 500);
        }
      });
    }
    function showFormError(form, msg) {
      var err = form.querySelector('.form-error-msg');
      if (!err) {
        err = document.createElement('p');
        err.className = 'form-error-msg';
        form.appendChild(err);
      }
      err.textContent = msg;
      err.classList.add('show');
      setTimeout(function() { err.classList.remove('show'); }, 5000);
    }
    setupForm('contact-form', 'contact-submit', '/contact');
    setupForm('prayer-form', 'prayer-submit', '/prayer');

    /* ==================== Service Worker Registration ==================== */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/js/service-worker.js').catch(function(err) {
        console.warn('SW registration failed:', err);
      });
    }

  });

})();
