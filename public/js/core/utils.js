/* ===== AD Niamey 2000 - Core Utilities ===== */

const CoreUtils = (() => {
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function lang() {
    return window.currentLang ? window.currentLang() : 'fr';
  }

  function tr(item, field) {
    if (!item) return '';
    const l = lang();
    const val = item[field + '_' + l];
    if (val && val.trim()) return val;
    const fallback = item[field + '_fr'];
    return fallback || item[field] || '';
  }

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn(...args);
      }
    };
  }

  function gradients(name) {
    const map = {
      'from-blue-500 to-purple-600': 'linear-gradient(135deg, #3b82f6, #9333ea)',
      'from-purple-600 to-blue-600': 'linear-gradient(135deg, #9333ea, #2563eb)',
      'from-green-500 to-teal-600': 'linear-gradient(135deg, #22c55e, #0d9488)',
      'from-blue-500 to-cyan-600': 'linear-gradient(135deg, #3b82f6, #0891b2)',
      'from-orange-500 to-red-600': 'linear-gradient(135deg, #f97316, #dc2626)',
      'from-yellow-500 to-orange-600': 'linear-gradient(135deg, #eab308, #ea580c)',
      'from-red-500 to-pink-600': 'linear-gradient(135deg, #ef4444, #db2777)',
      'from-indigo-500 to-purple-600': 'linear-gradient(135deg, #6366f1, #9333ea)',
      'from-pink-500 to-rose-600': 'linear-gradient(135deg, #ec4899, #e11d48)',
      'from-blue-700 to-blue-900': 'linear-gradient(135deg, #1d4ed8, #172554)',
      'from-blue-600 to-blue-800': 'linear-gradient(135deg, #2563eb, #1e3a8a)',
      'from-blue-800 to-blue-950': 'linear-gradient(135deg, #1e3a8a, #0f2b5c)',
    };
    return map[name] || 'linear-gradient(135deg, #1e3a8a, #172554)';
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function on(el, evt, fn) {
    if (el) el.addEventListener(evt, fn);
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function fetchHTML(url) {
    return fetch(url).then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    });
  }

  function injectHTML(selector, html) {
    const el = $(selector);
    if (el) el.innerHTML = html;
    return el;
  }

  function loadComponent(url, selector) {
    return fetchHTML(url).then(html => injectHTML(selector, html));
  }

  return { esc, lang, tr, debounce, throttle, gradients, $, $$, on, ready, fetchHTML, injectHTML, loadComponent };
})();

window.CoreUtils = CoreUtils;
