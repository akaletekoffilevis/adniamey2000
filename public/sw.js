const CACHE = 'adniamey2000-v4';
const ASSETS = [
  '/', '/index.html', '/404.html', '/a-propos.html',
  '/contact.html', '/evenements.html', '/galerie.html',
  '/mentions-legales.html', '/pasteurs.html', '/politique-confidentialite.html',
  '/css/style.min.css', '/favicon.svg', '/robots.txt',
  '/js/core/utils.js', '/js/core/storage.js', '/js/core/api.js',
  '/js/i18n/translations.js', '/js/i18n/language.js',
  '/js/ui/navbar.js', '/js/ui/cookie.js', '/js/ui/lightbox.js', '/js/ui/media.js',
  '/js/pages/home.js', '/js/pages/events.js', '/js/pages/gallery.js',
  '/js/pages/contact.js', '/js/pages/pastors.js',
  '/js/app.js',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.pathname.startsWith('/admin')) return;

  // API calls: network first, cache fallback
  if (url.pathname.startsWith('/api')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || new Response(JSON.stringify({ error: 'offline' }), { status: 503, headers: { 'Content-Type': 'application/json' } })))
    );
    return;
  }

  // Static assets: cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).then(res => {
        if (res.ok && res.type === 'basic' && url.origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'))
    )
  );
});
