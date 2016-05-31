'use strict'

const os = require('os')
const fs = require('fs')
const path = require('path')
const async = require('async')
const dataURIBuffer = require('data-uri-to-buffer')
const uuid = require('uuid')
const EventEmitter = require('events').EventEmitter
const listFiles = require('./list')

module.exports = function (images) {
	let events = new EventEmitter()
	let count = 0
	let baseName = uuid.v4()
	let tmpDir = os.tmpDir()


	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanUp
	], convertFinished)

	function decodeImages (done) {
		async.eachSeries(images, decodeImage, done)
	}

	function decodeImage (image, done) {
		let fileName = `${baseName}-${count++}.jpg`
		let buffer = dataURIBuffer(image)
		let ws = fs.createWriteStream(path.join(tmpDir, fileName))

		ws.on('error', done)
		  .end(buffer, done)

		events.emit('log', 'Converting')
	}

	function createVideo (done) {
		done()

	}

	function encodeVideo (done) {
		done()

	}

	function cleanUp (done) {
		event.emit('log', 'Cleaning up')

		listFiles(tmpDir, baseName, function (err, files) {
			if (err) return done(err)

			done()
		})
	}

	function convertFinished (err) {
		setTimeout(function () {
			events.emit('video', 'this will be the encoded video')
		}, 1000)
	}

	return events
}