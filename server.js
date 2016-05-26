'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080

const server = http.createServer()
server.on('request', onRequest)
server.on('listening', onListening)
server.listen(port)

function onRequest (req, res) {
	let index = path.join(__dirname, 'public', 'index.html')

	let rs = fs.createReadStream(index)
	rs.pipe(res)

	// rs.on('error', function () {

	// })

} 

function onListening () {
	console.log('HTTP 200 on port ' + port)	
}