var CACHE_NAME = 'meu-cuidador';
var urlsToCache = [
	'/meucuidador-plano-prevencao/',
	'/meucuidador-plano-prevencao/index.html',
	'/meucuidador-plano-prevencao/assets/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2',
	'/meucuidador-plano-prevencao/assets/imc.png',
	'/meucuidador-plano-prevencao/assets/jquery-3.2.1.min.js',
	'/meucuidador-plano-prevencao/assets/material.min.css',
	'/meucuidador-plano-prevencao/assets/material.min.js',
	'/meucuidador-plano-prevencao/assets/material+icon.css'
];
console.log("sw.js");
this.addEventListener('install', function(event) {
	// Perform install steps
	console.log("install sw");
	event.waitUntil(
	caches.open(CACHE_NAME)
	  .then(function(cache) {
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	  })
	);
});