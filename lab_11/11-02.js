const ws = require('ws')
const fs = require('fs')

const server = new ws.Server({ port: 4000 })
const path = './download/1.txt'

server.on('connection', client =>
{
    let duplex = ws.createWebSocketStream(client, { encoding: 'utf-8'})
    let file = fs.createReadStream(path)

    file.pipe(duplex)
})