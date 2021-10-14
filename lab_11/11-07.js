const Server = require('rpc-websockets').Server

const server = new Server({port: 4000})

server.register('A', args =>
{
    console.log('A')
}).public()

server.register('B', args =>
{
    console.log('B')
}).public()

server.register('C', args =>
{
    console.log('C')
}).public()
