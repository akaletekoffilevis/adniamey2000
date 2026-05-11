/* ===== AD Niamey 2000 - Cookie Consent ===== */

const CookieUI = (() => {
  const STORAGE_KEY = 'cookie_consent';

  function init() {
    if (AppStorage.get(STORAGE_KEY)) return;

    const banner = document.querySelector('.cookie-consent');
    if (!banner) return;

    setTimeout(() => banner.classList.add('show'), 500);

    const acceptBtn = banner.querySelector('.cookie-btn.accept');
    const declineBtn = banner.querySelector('.cookie-btn.decline');

    function dismiss(choice) {
      AppStorage.set(STORAGE_KEY, choice, 365 * 24 * 60 * 60 * 1000);
      banner.classList.remove('show');
      setTimeout(() => banner.style.display = 'none', 400);
    }

    if (acceptBtn) acceptBtn.addEventListener('click', () => dismiss('accepted'));
    if (declineBtn) declineBtn.addEventListener('click', () => dismiss('declined'));
  }

  return { init };
})();

window.CookieUI = CookieUI;
