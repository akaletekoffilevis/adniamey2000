/* ===== AD Niamey 2000 - Media Protection ===== */

const MediaUI = (() => {
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;

    // Prevent right-click on images
    document.addEventListener('contextmenu', e => {
      if (e.target.closest('.gallery-item, .gallery-overlay, img, .video-thumb')) {
        e.preventDefault();
      }
    });

    // Prevent drag
    document.addEventListener('dragstart', e => {
      if (e.target.closest('img, .gallery-item')) {
        e.preventDefault();
      }
    });

    // Protect dynamically added images
    const observer = new MutationObserver(() => {});
    observer.observe(document.body, { childList: true, subtree: true });

    // CSS injection for protection
    const style = document.createElement('style');
    style.textContent = 'img { pointer-events: none; user-select: none; -webkit-user-select: none; }';
    document.head.appendChild(style);
  }

  return { init };
})();

window.MediaUI = MediaUI;
