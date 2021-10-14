const Client = require('rpc-websockets').Client

const client = new Client('ws://localhost:4000/')

client.on('open', () =>
{
    client.subscribe('A').then(r => console.log(r))

    client.on('A', () =>
    {
        console.log('Event A')
    })
})