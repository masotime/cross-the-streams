'use strict';

var lzma = require('lzma-native'),
	fs = require('fs'),
	zlib = require('zlib');

(function() {
	//var encoder = lzma.createStream('easyEncoder', {preset: 9}),
	var	gz1 = fs.createReadStream('ipsum1.txt.gz'),
		gz2 = fs.createReadStream('ipsum2.txt.gz'),
		encoder = lzma.createStream('easyEncoder', {preset: 9}),
		combined = fs.createWriteStream('combined.xz');

	console.log('piping ipsum1');
	gz1.pipe(zlib.createGunzip()).pipe(encoder);

	setTimeout(function() {
		gz2.pipe(zlib.createGunzip()).pipe(encoder);
		console.log('piping ipsum2');
	}, 5000);

	console.log('piping to combined.xz');
	encoder.pipe(combined);

	combined.on('finish', function() {
		console.log('combined.xz finished');
	});

}());