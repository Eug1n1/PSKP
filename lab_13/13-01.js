const net = require('net')

const PORT = 3000

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`REC: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(PORT)
