const http = require('http')
const fs = require('fs')
const { getHandler } = require('./gethandler')
const { postHandler } = require('./posthandler')
const { putHandler } = require('./puthandler')
const { deleteHandler } = require('./deletehandler')

const rpc = require('rpc-websockets').Server
const wsServer = new rpc({ port: 4000 })

wsServer.event('change')

fs.watch('.', (event, file) => {
    let fileMatch = file.match(/^\d{12}_StudentList.json$/)
    if (fileMatch) {
        console.log(`${file}:\t${event}`)
        wsServer.emit('change')
    }
})

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            getHandler(req, res)
            break
        case 'POST':
            postHandler(req, res, wsServer)
            break
        case 'DELETE':
            deleteHandler(req, res, wsServer)
            break
        case 'PUT':
            putHandler(req, res, wsServer)
            break
    }
})

server.listen(3000)
