const http = require('http')

http.createServer((_req, res) => {
    console.log('REQUEST')
    res.writeHead(200, 'Normalno')
    res.end('OK')
}).listen(3000)
