const net = require('net')

const HOST = '127.0.0.1'
const PORT = 3000

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`REC: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(PORT)
