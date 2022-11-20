const net = require('net')

const HOST = '127.0.0.1'
const PORT = 3000

let client = new net.Socket()

client.connect(PORT, () => {
    setInterval(() => {
        client.write(new Date().toUTCString())
    }, 3000).unref()
})

client.on('data', (data) => {
    console.log(`REC: ${data}`)
})

client.on('close', (data) => {
    console.log('close')
})
