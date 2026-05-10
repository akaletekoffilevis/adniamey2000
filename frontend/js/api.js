(function() {
  'use strict';

  var API_URL = 'http://localhost:3001/api';
  var CACHE_PREFIX = 'adniamey2000_api_';
  var SYNC_INTERVAL = 5 * 60 * 1000;
  var VERSION_CACHE_KEY = CACHE_PREFIX + 'site_version_check';
  var VERSION_CACHE_DURATION = 2 * 1000;

  function cacheData(key, data, version) {
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data: data, version: version, timestamp: Date.now() }));
    } catch(e) {}
  }
  function clearCache(key) {
    try { localStorage.removeItem(CACHE_PREFIX + key); } catch(e) {}
  }
  function getCached(key) {
    try {
      var item = JSON.parse(localStorage.getItem(CACHE_PREFIX + key));
      if (item && item.data) return item.data;
    } catch(e) {}
    return null;
  }
  function getCachedVersion(key) {
    try {
      var item = JSON.parse(localStorage.getItem(CACHE_PREFIX + key));
      if (item && item.version) return item.version;
    } catch(e) {}
    return null;
  }
  function clearVersionCache() {
    try { localStorage.removeItem(VERSION_CACHE_KEY); } catch(e) {}
  }

  async function getSiteVersion() {
    try {
      var cached = JSON.parse(localStorage.getItem(VERSION_CACHE_KEY));
      if (cached && Date.now() - cached.timestamp < VERSION_CACHE_DURATION) return cached.version;
    } catch(e) {}
    try {
      var res = await fetch(API_URL + '/site/version');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      var version = data.version != null ? data.version : data;
      localStorage.setItem(VERSION_CACHE_KEY, JSON.stringify({ version: version, timestamp: Date.now() }));
      return version;
    } catch(e) {
      console.warn('Site version fetch failed', e);
      return null;
    }
  }

  async function fetchData(endpoint) {
    var cached = getCached(endpoint);
    if (cached) {
      var cachedVersion = getCachedVersion(endpoint);
      if (cachedVersion != null) {
        var currentVersion = await getSiteVersion();
        if (currentVersion != null && cachedVersion === currentVersion) return cached;
      }
    }
    try {
      var res = await fetch(API_URL + endpoint);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      var version = await getSiteVersion();
      cacheData(endpoint, data, version);
      return data;
    } catch(e) {
      console.warn('API fetch failed for', endpoint, e);
      return cached || [];
    }
  }

  async function getSiteData() {
    return fetchData('/site');
  }

  window.api = {
    apiUrl: API_URL,
    API_URL: API_URL,

    getEvents: function() { return fetchData('/events'); },
    getGallery: function() { return fetchData('/gallery'); },
    getSiteData: getSiteData,
    getSiteVersion: getSiteVersion,
    refreshSite: function() {
      clearCache('/site');
      clearVersionCache();
      return fetchData('/site');
    },
    refresh: function() {
      Object.keys(localStorage).forEach(function(k) {
        if (k.startsWith(CACHE_PREFIX)) localStorage.removeItem(k);
      });
      return Promise.all([

        fetchData('/events'),
        fetchData('/gallery')
      ]);
    }
  };

  if (document.visibilityState !== 'prerender') {
    setInterval(function() { api.refresh(); }, SYNC_INTERVAL);
  }

  if (typeof io !== 'undefined') {
    var socket = io(API_URL.replace('/api', ''), { transports: ['websocket', 'polling'] });
    window.__socket = socket;
    socket.on('connect', function() { console.log('Socket.IO connected'); });

    socket.on('event:created', function() { clearCache('/events'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'events' } })); });
    socket.on('event:updated', function() { clearCache('/events'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'events' } })); });
    socket.on('event:deleted', function() { clearCache('/events'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'events' } })); });
    socket.on('gallery:created', function() { clearCache('/gallery'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'gallery' } })); });
    socket.on('gallery:updated', function() { clearCache('/gallery'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'gallery' } })); });
    socket.on('gallery:deleted', function() { clearCache('/gallery'); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'gallery' } })); });
    socket.on('site:updated', function() { clearCache('/site'); clearVersionCache(); document.dispatchEvent(new CustomEvent('dataChanged', { detail: { type: 'site' } })); });
  }

})();
