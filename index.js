'use strict';

var lzma = require('lzma-native'),
	fs = require('fs'),
	zlib = require('zlib');

console.log('EXTREME?', lzma.PRESET_EXTREME);

(function() {
	//var encoder = lzma.createStream('easyEncoder', {preset: 9}),
	var	gz1 = fs.createReadStream('ipsum1.txt.gz'),
		gz2 = fs.createReadStream('ipsum2.txt.gz'),
		uz1 = zlib.createGunzip(),
		uz2 = zlib.createGunzip(),
		encoder = lzma.createStream('easyEncoder', {preset: 9}),
		combined = fs.createWriteStream('combined.xz');

	console.log('piping ipsum1');
	gz1.pipe(uz1).pipe(encoder, {end: false});

	setTimeout(function() {
		gz2.pipe(uz2).pipe(encoder); // this one can end it
		console.log('piping ipsum2');
	}, 5000);

	console.log('piping to combined.xz');
	encoder.pipe(combined);

	combined.on('finish', function() {
		console.log('combined.xz finished');
		process.exit();
	});

}/*()*/);

(function() {
	//var encoder = lzma.createStream('easyEncoder', {preset: 9}),
	var	in1 = fs.createReadStream('ipsum1.txt'),
		// in2 = fs.createReadStream('ipsum2.txt'),
		encoder = lzma.createStream('easyEncoder', {preset: 9}),
		combined = fs.createWriteStream('combined.xz');

	encoder.on('finish', function () {
		console.log('encoder has finished');
	});

	console.log('piping ipsum1');
	in1.pipe(encoder);

/*
	setTimeout(function() {
		console.log('piping ipsum2');
		in2.pipe(encoder, {end: true}); // this one can end it
	}, 5000);
*/

	console.log('piping to combined.xz');
	encoder.pipe(combined);

	combined.on('finish', function() {
		console.log('combined.xz finished');
	});

}());