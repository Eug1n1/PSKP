const ws = require('ws')

const server = new ws.Server({port: 4000})

let messageIndex = 0

server.on('connection', client =>
{
    client.on('message', message =>
    {
        let jsonMessage = JSON.parse(message.toString())
        client.send(JSON.stringify({
            server: messageIndex++,
            client: jsonMessage.client,
            timestamp: new Date().toISOString()
        }))
    })
})