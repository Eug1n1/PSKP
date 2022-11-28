const http = require('http')

const { getHandler } = require('./getHandler')
const { postHandler } = require('./postHandler')
const { putHandler } = require('./putHandler')
const { deleteHandler } = require('./deleteHandler')

const DB = require('./DB')
const Db = new DB()

http.createServer((request, response) => {
    console.log(request.method)

    response.setHeader('Access-Control-Allow-Origin', '*')

    switch (request.method) {
        case 'GET':
            getHandler(request, response, Db)
            break
        case 'POST':
            postHandler(request, response, Db)
            break
        case 'PUT':
            putHandler(request, response, Db)
            break
        case 'DELETE':
            deleteHandler(request, response, Db)
            break
        default:
            write_error_400(response, 'Invalid method')
            break
    }
}).listen(3000)

function write_error_400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(
        JSON.stringify({
            error: error,
        })
    )
}
