const http = require('http')
const { getHandler } = require('./gethandler')
const { postHandler } = require('./posthandler')
const { putHandler } = require('./puthandler')
const { deleteHandler } = require('./deletehandler')

const server = http.createServer((req, res) =>
{
    switch (req.method)
    {
        case 'GET':
            getHandler(req, res)
            break
        case 'POST':
            postHandler(req, res)
            break
        case 'DELETE':
            deleteHandler(req, res)
            break
        case 'PUT':
            putHandler(req, res)
            break
    }
})

server.listen(3000)