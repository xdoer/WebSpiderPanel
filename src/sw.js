/* eslint-disable */
importScripts('/daxie.js')

let db = null
self.addEventListener('install', (event) => {
  db = new Dexie("post_cache");
  db.version(1).stores({
    post_cache: 'key,response,timestamp'
  })
  console.log('Version installing');
});

self.addEventListener('activate', (event) => {
  console.log('Version now ready to handle');
});


/**
 * 因为 cache 不能缓存 post 请求， 所以使用 indexDB 替换掉默认的 cache
 * 
 * 将请求参数序列化作为 存储 key
 * 响应内容序列化之后保存到 response 中
 * 
 * 发起请求时，检查 key ,从 indexDB 中再取出 response ,再反序列化进行响应
 * 
 * 参考代码:https://a.kabachnik.info/offline-post-requests-via-service-worker-and-indexeddb.html
 * 问题描述:https://stackoverflow.com/questions/35270702/can-service-workers-cache-post-requests
 */


self.addEventListener('fetch', function (event) {
    if (!db) {
      db = new Dexie("post_cache");
      db.version(1).stores({
        post_cache: 'key,response,timestamp'
      })
    }
    event.respondWith(
      // First try to fetch the request from the server
      fetch(event.request.clone())
        .then(function (response) {
          // If it works, put the response into IndexedDB
          const req = event.request.clone()

          // API接口不缓存
          if (!/crawl\/api/i.test(req.url.href)) {
            cachePut(req, response.clone(), db.post_cache);
          }
          return response;
        })
        .catch(function () {
          // If it does not work, return the cached response. If the cache does not
          // contain a response for our request, it will give us a 503-response
          return cacheMatch(event.request.clone(), db.post_cache);
        })
    );
})

function serializeRequest(request) {
  var serialized = {
    url: request.url,
    headers: serializeHeaders(request.headers),
    method: request.method,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer
  };

  // Only if method is not `GET` or `HEAD` is the request allowed to have body.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request.clone().text().then(function (body) {
      serialized.body = body;
      return Promise.resolve(serialized);
    });
  }
  return Promise.resolve(serialized);
}

function serializeResponse(response) {
  var serialized = {
    headers: serializeHeaders(response.headers),
    status: response.status,
    statusText: response.statusText
  };

  return response.clone().text().then(function (body) {
    serialized.body = body;
    return Promise.resolve(serialized);
  });
}

function serializeHeaders(headers) {
  var serialized = {};

  for (var entry of headers.entries()) {
    serialized[entry[0]] = entry[1];
  }
  return serialized;
}

function deserializeResponse(data) {
  return Promise.resolve(new Response(data.body, data));
}

function cachePut(request, response, store) {
  var key, data;
  getPostId(request.clone())
    .then(function (id) {
      key = id;
      return serializeResponse(response.clone());
    }).then(function (serializedResponse) {
      data = serializedResponse;
      var entry = {
        key: key,
        response: data,
        timestamp: Date.now()
      };
      store
        .add(entry)
        .catch(function (error) {
          store.update(entry.key, entry);
        });
    });
}

function cacheMatch(request, store) {
  return getPostId(request.clone())
    .then(function (id) {
      return store.get(id);
    }).then(function (data) {
      if (data) {
        return deserializeResponse(data.response);
      } else {
        return new Response('', { status: 503, statusText: 'Service Unavailable' });
      }
    });
}

function getPostId(request) {
  return Promise.resolve(JSON.stringify(serializeRequest(request.clone())));
}