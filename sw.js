// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'meu-cuidador-v1';
var cacheName = 'meu-cuidadorPWA-final-1';
var filesToCache = [
	'/meucuidador-plano-prevencao/',
	'/meucuidador-plano-prevencao/index.html',
	'/meucuidador-plano-prevencao/manifest.json',
	'/meucuidador-plano-prevencao/assets/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2',
	'/meucuidador-plano-prevencao/assets/imc.png',
	'/meucuidador-plano-prevencao/assets/jquery-3.2.1.min.js',
	'/meucuidador-plano-prevencao/assets/material.min.css',
	'/meucuidador-plano-prevencao/assets/material.min.js',
	'/meucuidador-plano-prevencao/assets/material+icon.css',
	'/meucuidador-plano-prevencao/assets/ic_launcher48x48.png',
	'/meucuidador-plano-prevencao/assets/ic_launcher72x72.png',
	'/meucuidador-plano-prevencao/assets/ic_launcher96x96.png',
	'/meucuidador-plano-prevencao/assets/ic_launcher144x144.png',
	'/meucuidador-plano-prevencao/assets/ic_launcher192x192.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log('[Service Worker] Fetch', e.request.url);
	/*
	 * The app is asking for app shell files. In this scenario the app uses the
	 * "Cache, falling back to the network" offline strategy:
	 * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
	 */
	e.respondWith(
	  caches.match(e.request).then(function(response) {
		return response || fetch(e.request);
	  })
	);  
});
