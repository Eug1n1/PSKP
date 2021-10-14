const Client = require('rpc-websockets').Client

const client = new Client('ws://localhost:4000/')

client.on('open', () =>
{
    client.subscribe('B').then(r => console.log(r))

    client.on('B', () =>
    {
        console.log('Event B')
    })
})