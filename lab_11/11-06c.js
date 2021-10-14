const Client = require('rpc-websockets').Client

const client = new Client('ws://localhost:4000/')

client.on('open', () =>
{
    client.subscribe('C').then(r => console.log(r))

    client.on('C', () =>
    {
        console.log('Event C')
    })
})