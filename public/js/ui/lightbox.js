/* ===== AD Niamey 2000 - Lightbox & Video Modal ===== */

const LightboxUI = (() => {
  function init() {
    // Gallery lightbox
    document.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const overlay = item.querySelector('.gallery-overlay span');
      const label = overlay ? overlay.textContent : '';
      const bg = item.style.backgroundImage || '';

      const lb = document.querySelector('.lightbox');
      if (!lb) return;
      const content = lb.querySelector('.lightbox-content');
      if (!content) return;

      content.innerHTML =
        '<div style="width:100%;height:100%;border-radius:1rem;background:' +
        bg +
        ';background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center">' +
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="96" height="96" style="opacity:0.3">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>' +
        '</svg></div>' +
        (label ? '<div class="gallery-overlay" style="position:absolute;bottom:2rem;left:2rem;opacity:1!important;background:none"><span>' + CoreUtils.esc(label) + '</span></div>' : '');

      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    // Lightbox close
    const lbClose = document.querySelector('.lightbox-close');
    const lb = document.querySelector('.lightbox');
    if (lbClose && lb) {
      lbClose.addEventListener('click', () => {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      });
      lb.addEventListener('click', e => {
        if (e.target === lb) {
          lb.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lb.classList.contains('open')) {
          lb.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Video modal
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-video]');
      if (!trigger) return;
      const url = trigger.getAttribute('data-video');
      const modal = document.querySelector('.video-modal');
      const frame = modal ? modal.querySelector('iframe') : null;
      if (!modal || !frame) return;
      frame.src = url;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const vmClose = document.querySelector('.video-modal-close');
    const vm = document.querySelector('.video-modal');
    if (vmClose && vm) {
      vmClose.addEventListener('click', () => {
        vm.classList.remove('show');
        const frame = vm.querySelector('iframe');
        if (frame) frame.src = '';
        document.body.style.overflow = '';
      });
      vm.addEventListener('click', e => {
        if (e.target === vm) {
          vm.classList.remove('show');
          const frame = vm.querySelector('iframe');
          if (frame) frame.src = '';
          document.body.style.overflow = '';
        }
      });
    }
  }

  return { init };
})();

window.LightboxUI = LightboxUI;
