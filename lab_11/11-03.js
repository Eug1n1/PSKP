const ws = require('ws')

const server = new ws.Server({port: 4000 })

let messageIndex = 0;
let messageInterval = setInterval(() =>
{
    server.clients.forEach(client =>
    {
        if (client.readyState === ws.OPEN)
        {
            client.send(`11-03-server: ${messageIndex}`)
            messageIndex++
        }
    })
}, 15000)

let pingInterval = setInterval(() =>
{
    let clientsCount = 0
    server.clients.forEach(client =>
    {
        if (client.isAlive === false)
        {
            client.terminate()
        }

        clientsCount++
        client.isAlive = false

        client.ping()
    })

    console.log(`${clientsCount} clients is alive`)

}, 5000)

server.on('connection', client =>
{
    client.isAlive = true

    client.on('pong', () =>
    {
        client.isAlive = true
    })
})