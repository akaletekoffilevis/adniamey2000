const CACHE = 'adniamey2000-v3';

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll([
        '/', '/index.html', '/404.html', '/a-propos.html',
        '/contact.html', '/evenements.html', '/galerie.html',
        '/mentions-legales.html', '/pasteurs.html', '/politique-confidentialite.html',
        '/css/style.min.css', '/js/i18n.min.js', '/js/api.min.js',
        '/js/script.min.js', '/js/dynamic.min.js', '/data/fr.js', '/data/en.js', '/data/ha.js', '/data/it.js',
        '/favicon.svg', '/robots.txt'
      ]).catch(function(err) { console.warn('SW: cache addAll partial fail', err); });
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.filter(function(n) { return n !== CACHE; }).map(function(n) { return caches.delete(n); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        if (res.ok && res.type === 'basic' && url.origin === self.location.origin) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function() { return caches.match('/index.html'); });
    })
  );
});
