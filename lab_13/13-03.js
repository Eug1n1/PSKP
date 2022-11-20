const net = require('net')

const PORT = 3000

let sum = 0

net.createServer((socket) => {
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
