const dgram = require('dgram')

const PORT = 3000

let client = dgram.createSocket('udp4')

client.connect(PORT, (err) => {
    if (err) {
        console.log(err)
    }

    setInterval(() => {
        client.send(new Date().toUTCString())
    }, 1000)
})

client.on('message', (msg, _rinfo) => {
    console.log(`REC: ${msg}`)
})
