const Client = require('rpc-websockets').Client

const client = new Client('ws://localhost:4000')

client.on('open', () =>
{

})