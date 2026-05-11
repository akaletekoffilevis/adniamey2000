/* ===== AD Niamey 2000 - Language Engine ===== */

const LanguageEngine = (() => {
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'fr';
  const SUPPORTED = ['fr', 'en', 'ha', 'it'];
  const LANG_NAMES = { fr: 'Français', en: 'English', ha: 'Hausa', it: 'Italiano' };

  let currentLang = DEFAULT_LANG;
  let translations = {};

  function getLang() {
    return AppStorage.get(STORAGE_KEY) || navigator.language?.split('-')[0] || DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    AppStorage.set(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switcher a, .lang-select').forEach(el => {
      if (el.tagName === 'A') {
        el.classList.toggle('active', el.getAttribute('data-lang') === lang);
      } else if (el.tagName === 'SELECT') {
        el.value = lang;
      }
    });
    translatePage();
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function loadTranslations() {
    const data = window.AdTranslations || {};
    translations = data[currentLang] || data[DEFAULT_LANG] || {};
  }

  function t(key, fallback) {
    if (!key) return fallback || '';
    const val = translations[key];
    return val != null ? val : (fallback || key);
  }

  function translatePage() {
    loadTranslations();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (el.tagName === 'META') {
        el.setAttribute('content', text);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', text);
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n');
      if (attr && key) {
        el.setAttribute(attr, t(key));
      }
    });
    document.title = t('meta_title', document.title);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta_description', desc.getAttribute('content')));
  }

  function init() {
    currentLang = getLang();
    document.documentElement.lang = currentLang;
    loadTranslations();
    translatePage();

    // Handle lang switcher clicks
    document.querySelectorAll('.lang-switcher a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const lang = a.getAttribute('data-lang');
        if (lang) setLang(lang);
      });
    });

    // Handle lang select
    document.querySelectorAll('.lang-select').forEach(sel => {
      sel.value = currentLang;
      sel.addEventListener('change', function () {
        setLang(this.value);
      });
    });
  }

  window.switchLang = setLang;
  window.__ = t;
  window.currentLang = () => currentLang;

  return { init, setLang, t, getLang, currentLang: () => currentLang };
})();

window.LanguageEngine = LanguageEngine;
