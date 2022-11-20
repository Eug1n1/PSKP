const dgram = require('dgram')

const PORT = 3000

let server = dgram.createSocket('udp4')

server.on('message', (msg, rinfo) => {
    console.log(`REC: ${msg}`)
    server.send(`ECHO: ${msg}`, rinfo.port)
})

server.bind(PORT)

