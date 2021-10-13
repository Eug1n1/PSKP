const ws = require('ws')
const fs = require('fs')

const webSocket = new ws('ws://localhost:4000/')

webSocket.on('open', () =>
{
    console.log('open')

    let duplex = ws.createWebSocketStream(webSocket, {encoding: 'utf-8'})
    let file = fs.createWriteStream(`upload/${Date.now()}.txt`)

    duplex.pipe(file)
})

webSocket.on('close', () =>
{
    console.log('close')
})

