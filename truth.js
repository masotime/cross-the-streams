'use strict';

var lzma = require('lzma-native'),
	fs = require('fs'),
	path = require('path'),
	zlib = require('zlib');

(function main() {

	var filename = process.argv[2] || 'ipsum1.txt',
		ext = path.extname(filename),
		base = path.basename(filename, ext);

	var infile = fs.createReadStream(filename),
		lzcompressor = lzma.createStream('easyEncoder', {preset: 9}),
		outfilename = [filename, 'xz'].join('.'),
		outfile = fs.createWriteStream(outfilename);

	var gzcompressor = zlib.createGzip(),
		gzoutfilename = [filename, 'gz'].join('.'),
		gzoutfile = fs.createWriteStream(gzoutfilename);

	function logFinish(stream, name) {

		['readable', 'data', 'end', 'close', 'error', 'drain', 'pipe', 'unpipe', 'finish'].map(function (eventName) {
			stream.on(eventName, function () {
				console.log('%s has %s\'d', name, eventName);
			});
		});

	}

	//logFinish(infile, 'infile');
	//logFinish(lzcompressor, 'compressfile');
	//logFinish(outfile, 'outfile');

	infile.pipe(lzcompressor).pipe(outfile);

	// simultaneously pipe to gzip
	infile.pipe(gzcompressor).pipe(gzoutfile);

	outfile.on('finish', function() {
		console.log('%s has been written', outfilename);
	});

	gzoutfile.on('finish', function() {
		console.log('%s has been written', gzoutfilename);
	});

	/*
	setInterval(function () {
		console.log('# of async streams = %s', lzma.Stream.curAsyncStreams.length);
	}, 1000);
	*/
}());

