/* ===== AD Niamey 2000 - API Client ===== */

const ApiClient = (() => {
  const BASE = window.location.origin + '/api';

  async function fetchJSON(endpoint, opts = {}) {
    const url = BASE + endpoint;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      ...opts,
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || 'HTTP ' + res.status);
    }
    return res.json();
  }

  function get(endpoint) {
    return fetchJSON(endpoint);
  }

  function post(endpoint, data) {
    return fetchJSON(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  function put(endpoint, data) {
    return fetchJSON(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  function del(endpoint) {
    return fetchJSON(endpoint, { method: 'DELETE' });
  }

  async function getSiteData() {
    return get('/site');
  }

  async function getSiteVersion() {
    try {
      const data = await get('/site/version');
      return data.version;
    } catch {
      return null;
    }
  }

  function getEvents() {
    return get('/events');
  }

  function getGallery() {
    return get('/gallery');
  }

  function getPastors() {
    return getSiteData().then(d => d.pastors || []);
  }

  // Legacy API (backward compat)
  window.api = {
    apiUrl: BASE,
    API_URL: BASE,
    getEvents,
    getGallery,
    getSiteData,
    getSiteVersion,
    getPastors,
  };

  return { get, post, put, del, getSiteData, getSiteVersion, getEvents, getGallery, getPastors, BASE };
})();

window.ApiClient = ApiClient;
