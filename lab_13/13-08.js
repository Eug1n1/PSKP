const net = require('net')

let port = process.argv[2]

if (isNaN(port)) {
    console.log('port is Nan')
    process.exit(1)
}

let client = new net.Socket()
client.connect(Number(port), () => {
    setInterval(() => {
        let num = Math.floor(Math.random() * 10).toString()

        console.log(num)
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
