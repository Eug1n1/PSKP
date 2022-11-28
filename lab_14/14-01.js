const http = require('http')

const { getHandler} = require('./getHandler')
const { postHandler} = require('./postHandler')
const { putHandler} = require('./putHandler')
const { deleteHandler} = require('./deleteHandler')

const DB = require('./DB')
const Db = new DB()


http.createServer((req, res) => {
    console.log(req.method)
    switch (req.method) {
        case 'GET':
            getHandler(req, res, Db)
            break
        case 'POST':
            postHandler(req, res, Db)
            break
        case 'PUT':
            putHandler(req, res, Db)
            break
        case 'DELETE':
            deleteHandler(req, res, Db)
            break
        default:
            res.statusCode = 400
            res.statusMessage = 'Invalid method'
            res.end('<h1>error</h1></br>' + '<h3>' + error + '</h3>')
            break
    }
}).listen(3000)
