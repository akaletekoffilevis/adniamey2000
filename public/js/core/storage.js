/* ===== AD Niamey 2000 - Storage (localStorage with expiry) ===== */

const AppStorage = (() => {
  const PREFIX = 'adniamey2000_';

  function get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(PREFIX + key);
        return null;
      }
      return parsed.value;
    } catch {
      return null;
    }
  }

  function set(key, value, ttlMs) {
    try {
      const data = { value };
      if (ttlMs) data.expiry = Date.now() + ttlMs;
      localStorage.setItem(PREFIX + key, JSON.stringify(data));
    } catch (e) {
      // localStorage full or disabled
      console.warn('Storage.set failed:', e);
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {}
  }

  function clear() {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  return { get, set, remove, clear };
})();

window.AppStorage = AppStorage;
