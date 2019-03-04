self.addEventListener('install', (event) => {
  console.log('Version installing', event);

  event.waitUntil(
    caches.open("static-v1").then(cache => cache.add("/"))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Version now ready to handle');
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      var request = event.request.clone();
      return fetch(request).then(function (httpRes) {

        if (!httpRes || httpRes.status !== 200) {
          return httpRes;
        }

        var responseClone = httpRes.clone();
        caches.open('static-v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });

        return httpRes;
      });
    })
  );
});
