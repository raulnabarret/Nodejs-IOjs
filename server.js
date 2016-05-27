'use strict'

const http = require('http')
const path = require('path')
const router = require('./router')

const server = http.createServer()
const port = process.env.PORT || 8080

server.on('request', router)
server.on('listening', onListening)

server.listen(port) 

function onListening () {
	console.log(`HTTP 200 on port ${port}`)	
}