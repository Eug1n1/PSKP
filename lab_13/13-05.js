const net = require('net')

const PORT = 3000

net.createServer((socket) => {
    let sum = 0

    socket.on('data', (data) => {
        console.log(`REC: ${data}`)

        if (Number(data) == NaN) {
            socket.write('recieved Nan')
            socket.destroy()
        }

        sum += Number(data)
    })

    setInterval(() => {
        socket.write(sum.toString())
    }, 5000).unref()
}).listen(PORT)
