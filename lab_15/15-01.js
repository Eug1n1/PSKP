const DB = require('./db')
const http = require('http')
const url = require('url')
const Db = new DB()

http.createServer((request, response) => {
    console.log(request.method)
    switch (request.method) {
        case 'GET':
            getHandler(request, response)
            break
        case 'POST':
            postHandler(request, response)
            break
        case 'PUT':
            putHandler(request, response)
            break
        case 'DELETE':
            deleteHandler(request, response)
            break
        default:
            writeError(response, 'Invalid Method')
            break
    }
}).listen(3000)

async function getHandler(request, response) {
    let urn = url.parse(request.url).pathname
    let path_mas = urn.split('/')

    const queryObject = url.parse(request.url, true).query

    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
    })

    switch (path_mas[path_mas.length - 1]) {
        case 'faculties':
            Db.GetRecordsFromCollection('faculty')
                .then((r) => {
                    response.end(JSON.stringify(r))
                })
                .catch((e) => {
                    writeError(response, e)
                })

            break
        case 'pulpits':
            if (!!queryObject) {
                Db.GetPulpitsByFaculties(queryObject.f)
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            } else {
                Db.GetRecordsFromCollection('pulpit')
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            }
            break
        case (faculty = /\/api\/faculties\/(\w+)/.exec(urn)?.[1]):
            Db.GetFaculty({ faculty: faculty })
                .then((records) => {
                    response.end(JSON.stringify(records))
                })
                .catch((error) => {
                    writeError(response, error)
                })
            break
        case (pulpit = /\/api\/pulpits\/(\w+)/.exec(urn)?.[1]):
            Db.GetPulpit({ pulpit: pulpit })
                .then((records) => {
                    response.end(JSON.stringify(records))
                })
                .catch((error) => {
                    writeError(response, error)
                })
            break
        default:
            console.log(1)
            break
    }
}

function writeError(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(JSON.stringify(error))
}
