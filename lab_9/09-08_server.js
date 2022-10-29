/*
const http = require('http')
const fs = require('fs')
const FormData = require("form-data");

http.createServer((req, res) =>
{
    const readStream = fs.readFileSync('./pic.png');

    const form = new FormData();
    form.append('file', readStream, {
        filename : 'pic.png',
        contentType: 'image/png',
        knownLength: readStream.length
    })

    res.writeHead(200, 'Normal', form.getHeaders())
    res.end('OK')

}).listen(3000)
*/


const http = require('http')
const fs = require('fs')
const Form = require('form-data')

http.createServer((_req, res) => {
    let form = new Form()
    form.append('file', fs.createReadStream('text.txt'), { knownLength: fs.statSync('text.txt').size })

    let body = fs.readFileSync('./text.txt')

    res.writeHead(200, form.getHeaders())
    res.end(body)
}).listen(3000)
