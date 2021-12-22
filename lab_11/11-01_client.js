const fs = require('fs');
const ws = require('ws');

const socket = new ws.WebSocket('ws://localhost:4000/');

let path = './download/1.txt'

socket.on('open',()=>
{
    const duplex = ws.createWebSocketStream(socket,{encoding:'utf-8'});
    let file = fs.createReadStream(path);

    file.pipe(duplex);
})