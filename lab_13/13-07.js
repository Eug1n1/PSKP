const net = require('net')

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`4xREC: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(40000)
console.log(123)

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`5xREC: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(50000)
