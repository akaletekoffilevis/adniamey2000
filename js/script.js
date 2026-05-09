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

document.addEventListener('DOMContentLoaded', function() {
  var fb = document.querySelector('.footer-bottom');
  if (!fb) return;
  var al = document.createElement('a');
  al.href = '#';
  al.style.cssText = 'font-size:.75rem;color:var(--gray-500);margin-left:.75rem;text-decoration:none;opacity:.5';
  al.textContent = 'Admin';
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:none;align-items:center;justify-content:center;z-index:9999';
  ov.innerHTML = '<div style="background:#fff;border-radius:1rem;padding:2rem;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><div style="width:3rem;height:3rem;background:#dbeafe;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem"><svg viewBox="0 0 100 100" fill="#1e3a8a" width="24" height="24"><path d="M50 10L60 40L90 40L65 60L75 90L50 70L25 90L35 60L10 40L40 40Z"/></svg></div><h3 style="font-family:Playfair Display,serif;color:#1e3a8a;text-align:center;margin:0 0 .25rem">Acces Admin</h3><p style="font-size:.85rem;color:#6b7280;text-align:center;margin:0 0 1.25rem">Connectez-vous pour gerer le site</p><input type="email" id="ae" placeholder="Email" style="width:100%;padding:.6rem .875rem;border:1px solid #d1d5db;border-radius:.5rem;margin-bottom:.75rem;font-size:.9rem;box-sizing:border-box"><input type="password" id="ap" placeholder="Mot de passe" style="width:100%;padding:.6rem .875rem;border:1px solid #d1d5db;border-radius:.5rem;margin-bottom:.5rem;font-size:.9rem;box-sizing:border-box"><p id="ae-err" style="color:#dc2626;font-size:.8rem;text-align:center;margin:0 0 .5rem;display:none"></p><button onclick="var e=document.getElementById(\'ae\'),p=document.getElementById(\'ap\'),r=document.getElementById(\'ae-err\');if(!e.value.includes(\'@\')){r.textContent=\'Email invalide\';r.style.display=\'block\';return}if(p.value.length<6){r.textContent=\'Mot de passe incorrect\';r.style.display=\'block\';return}window.location=\'admin/login.html\'" style="width:100%;padding:.6rem;background:#1d4ed8;color:#fff;border:none;border-radius:.5rem;font-weight:600;cursor:pointer;font-size:.9rem">Se connecter</button><button onclick="document.getElementById(\'admin-overlay\').style.display=\'none\'" style="width:100%;padding:.5rem;background:none;border:none;color:#6b7280;cursor:pointer;margin-top:.5rem;font-size:.85rem">Fermer</button></div>';
  ov.id = 'admin-overlay';
  document.body.appendChild(ov);
  al.onclick = function(e) { e.preventDefault(); ov.style.display = 'flex'; };
  ov.onclick = function(e) { if (e.target === ov) ov.style.display = 'none'; };
  var sl = fb.querySelector('.social-links');
  if (sl) sl.appendChild(al);
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

document.addEventListener('DOMContentLoaded', function() {
  var fb = document.querySelector('.footer-bottom');
  if (!fb) return;
  var al = document.createElement('a');
  al.href = '#';
  al.style.cssText = 'font-size:.75rem;color:var(--gray-500);margin-left:.75rem;text-decoration:none;opacity:.5';
  al.textContent = 'Admin';
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:none;align-items:center;justify-content:center;z-index:9999';
  ov.innerHTML = '<div style="background:#fff;border-radius:1rem;padding:2rem;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><div style="width:3rem;height:3rem;background:#dbeafe;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem"><svg viewBox="0 0 100 100" fill="#1e3a8a" width="24" height="24"><path d="M50 10L60 40L90 40L65 60L75 90L50 70L25 90L35 60L10 40L40 40Z"/></svg></div><h3 style="font-family:Playfair Display,serif;color:#1e3a8a;text-align:center;margin:0 0 .25rem">Acces Admin</h3><p style="font-size:.85rem;color:#6b7280;text-align:center;margin:0 0 1.25rem">Connectez-vous pour gerer le site</p><input type="email" id="ae" placeholder="Email" style="width:100%;padding:.6rem .875rem;border:1px solid #d1d5db;border-radius:.5rem;margin-bottom:.75rem;font-size:.9rem;box-sizing:border-box"><input type="password" id="ap" placeholder="Mot de passe" style="width:100%;padding:.6rem .875rem;border:1px solid #d1d5db;border-radius:.5rem;margin-bottom:.5rem;font-size:.9rem;box-sizing:border-box"><p id="ae-err" style="color:#dc2626;font-size:.8rem;text-align:center;margin:0 0 .5rem;display:none"></p><button onclick="var e=document.getElementById(\'ae\'),p=document.getElementById(\'ap\'),r=document.getElementById(\'ae-err\');if(!e.value.includes(\'@\')){r.textContent=\'Email invalide\';r.style.display=\'block\';return}if(p.value.length<6){r.textContent=\'Mot de passe incorrect\';r.style.display=\'block\';return}window.location=\'admin/login.html\'" style="width:100%;padding:.6rem;background:#1d4ed8;color:#fff;border:none;border-radius:.5rem;font-weight:600;cursor:pointer;font-size:.9rem">Se connecter</button><button onclick="document.getElementById(\'admin-overlay\').style.display=\'none\'" style="width:100%;padding:.5rem;background:none;border:none;color:#6b7280;cursor:pointer;margin-top:.5rem;font-size:.85rem">Fermer</button></div>';
  ov.id = 'admin-overlay';
  document.body.appendChild(ov);
  al.onclick = function(e) { e.preventDefault(); ov.style.display = 'flex'; };
  ov.onclick = function(e) { if (e.target === ov) ov.style.display = 'none'; };
  var sl = fb.querySelector('.social-links');
  if (sl) sl.appendChild(al);
});
