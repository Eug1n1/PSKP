const net = require('net')

const PORT = 3000

let client = new net.Socket()

client.connect(PORT, () => {
    setInterval(() => {
        client.write(Math.floor(Math.random() * 10).toString())
    }, 1000).unref()
})

client.on('data', (data) => {
    console.log(`REC: ${data}`)
})

client.on('close', (data) => {
    console.log('close')
    client.destroy()
})

setTimeout(() => {
    client.destroy()
}, 20 * 1000)
