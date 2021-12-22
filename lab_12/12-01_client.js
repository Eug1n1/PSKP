const rpcClient = require('rpc-websockets').Client;
let ws = new rpcClient('ws://localhost:4000');

ws.on('open',()=>{
    ws.subscribe('change').then(r => console.log(r))

    ws.on('change',()=>
    {
        console.log('Event Change file')
    })
})