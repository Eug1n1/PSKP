const http = require('http');

http.createServer(function (request, response)
    {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<h1>Hello, world</h1>')
    }
).listen(3000)

console.log("Server running");