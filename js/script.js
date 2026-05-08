document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-group').forEach(function(group) {
    const buttons = group.querySelectorAll('.filter-btn');
    const targets = document.querySelectorAll(group.getAttribute('data-target'));

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        targets.forEach(function(item) {
          if (filter === 'all') {
            item.style.display = '';
          } else {
            item.style.display = item.classList.contains(filter) ? '' : 'none';
          }
        });
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll animations (Intersection Observer)
  var animElements = document.querySelectorAll('.anim-hidden');
  if (animElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animElements.forEach(function(el) { observer.observe(el); });
  } else {
    animElements.forEach(function(el) { el.classList.add('anim-visible'); });
  }

  // Lightbox Gallery
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightbox-content');
  var lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxContent) {
    document.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var bg = window.getComputedStyle(this).backgroundImage ||
                 window.getComputedStyle(this).background ||
                 'linear-gradient(135deg, var(--blue-600), var(--blue-800))';
        var label = this.querySelector('.gallery-overlay span');
        var svg = this.querySelector('svg');
        lightboxContent.innerHTML = '';
        if (svg) {
          lightboxContent.innerHTML = svg.outerHTML;
        }
        if (label) {
          lightboxContent.innerHTML += '<div class="gallery-overlay"><span>' + label.textContent + '</span></div>';
        }
        lightboxContent.style.background = this.style.backgroundColor ? '' : this.style.background || bg;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Audio Player
  var audioPlayer = document.getElementById('audio-player');
  var audioPlayBtn = document.getElementById('audio-play-btn');
  var audioProgress = document.getElementById('audio-progress');
  var audioProgressBar = document.getElementById('audio-progress-bar');
  var audioTime = document.getElementById('audio-time');
  var audioTitle = document.getElementById('audio-title');
  var audioPastor = document.getElementById('audio-pastor');
  var audioClose = document.getElementById('audio-close');
  var audioEl = document.getElementById('audio-el');

  if (audioPlayer) {
    document.querySelectorAll('.listen-sermon').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var title = this.getAttribute('data-title');
        var pastor = this.getAttribute('data-pastor');
        var src = this.getAttribute('data-src');

        if (audioTitle) audioTitle.textContent = title || 'Sermon';
        if (audioPastor) audioPastor.textContent = pastor || '';
        if (audioEl && src) {
          audioEl.src = src;
          audioEl.load();
          audioEl.play();
        }
        audioPlayer.classList.add('open');
      });
    });

    if (audioPlayBtn && audioEl) {
      var isPlaying = false;
      audioPlayBtn.addEventListener('click', function() {
        if (audioEl.paused) {
          audioEl.play();
        } else {
          audioEl.pause();
        }
      });

      audioEl.addEventListener('play', function() {
        isPlaying = true;
        audioPlayBtn.innerHTML = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
      });

      audioEl.addEventListener('pause', function() {
        isPlaying = false;
        audioPlayBtn.innerHTML = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      });

      audioEl.addEventListener('timeupdate', function() {
        if (audioEl.duration) {
          var pct = (audioEl.currentTime / audioEl.duration) * 100;
          audioProgressBar.style.width = pct + '%';
          audioTime.textContent = formatTime(audioEl.currentTime) + ' / ' + formatTime(audioEl.duration);
        }
      });

      audioProgress.addEventListener('click', function(e) {
        var rect = this.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        audioEl.currentTime = pct * audioEl.duration;
      });
    }

    if (audioClose) {
      audioClose.addEventListener('click', function() {
        audioPlayer.classList.remove('open');
        if (audioEl) { audioEl.pause(); audioEl.currentTime = 0; }
      });
    }
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // Back to top
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
