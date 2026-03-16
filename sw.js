const CACHE_NAME = 'ncs-stat-v2';
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icono_Calculadora.png"
];

// Instalación
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // CORRECCIÓN: Usar ASSETS en mayúsculas
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // Fuerza al SW a activarse apenas se instala
  );
});

// Activación (Limpieza de caché vieja)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estrategia de respuesta
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
