const net = require('net')
const { exit } = require('process')

const PORT = 3000

let num = process.argv[2] | 1
if (isNaN(num)) {
    console.log('num is Nan')
    exit(1)
}

let client = new net.Socket()

client.connect(PORT, () => {
    setInterval(() => {
        client.write(num)
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
