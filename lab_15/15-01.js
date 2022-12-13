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
            Db.GetAllRecordsFromCollection('faculty')
                .then((r) => {
                    response.end(JSON.stringify(r))
                })
                .catch((e) => {
                    writeError(response, e)
                })

            break
        case 'pulpits':
            if (!!queryObject.f) {
                Db.GetPulpitsByFaculties(queryObject.f)
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            } else {
                Db.GetAllRecordsFromCollection('pulpit')
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
                    response.end(
                        JSON.stringify(records === null ? {} : records)
                    )
                })
                .catch((error) => {
                    writeError(response, error)
                })
            break
        default:
            writeError(response, {
                error: 'Invalid URI',
            })
            break
    }
}

function postHandler(request, response) {
    let urn = url.parse(request.url).pathname
    let path_mas = urn.split('/')

    let data = ''
    request.on('data', (chunk) => {
        data += chunk
    })

    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
    })

    switch (path_mas[path_mas.length - 1]) {
        case 'faculties':
            request.on('end', () => {
                Db.InsertFaculty(JSON.parse(data))
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            })
            break
        case 'pulpits':
            request.on('end', () => {
                Db.InsertPulpit(JSON.parse(data))
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            })
            break
        case 'transaction':
            request.on('end', () => {
                Db.InsertPulpits(JSON.parse(data), {
                    readConcern: { level: 'local' },
                    writeConcern: { m: 'majority' },
                }).then((data) => {
                    console.log(data)
                })
                response.end('132')
            })
            break
        default:
            writeError(response, {
                error: 'Invalid URI',
            })
            break
    }
}

function putHandler(request, response) {
    let urn = url.parse(request.url).pathname
    let path_mas = urn.split('/')

    let data = ''
    request.on('data', (chunk) => {
        data += chunk
    })

    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
    })

    switch (path_mas[path_mas.length - 1]) {
        case 'faculties':
            request.on('end', () => {
                Db.UpdateFaculty(JSON.parse(data))
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            })
            break
        case 'pulpits':
            request.on('end', () => {
                Db.UpdatePulpit(JSON.parse(data))
                    .then((records) => {
                        response.end(JSON.stringify(records))
                    })
                    .catch((error) => {
                        writeError(response, error)
                    })
            })
            break
        default:
            writeError(response, {
                error: 'Invalid URI',
            })
            break
    }
}

function deleteHandler(request, response) {
    let urn = url.parse(request.url).pathname
    let path_mas = urn.split('/')

    const queryObject = url.parse(request.url, true).query

    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
    })

    switch (path_mas[path_mas.length - 1]) {
        case (faculty = /\/api\/faculties\/(\w+)/.exec(urn)?.[1]):
            Db.DeleteFaculty({ faculty: faculty })
                .then((records) => {
                    response.end(JSON.stringify(records))
                })
                .catch((error) => {
                    writeError(response, error)
                })
            break
        case (pulpit = /\/api\/pulpits\/(\w+)/.exec(urn)?.[1]):
            Db.DeletePulpit({ pulpit: pulpit })
                .then((records) => {
                    response.end(JSON.stringify(records))
                })
                .catch((error) => {
                    writeError(response, error)
                })
            break
        default:
            writeError(response, {
                error: 'Invalid URI',
            })
            break
    }
}
function writeError(response, error) {
    response.statusCode = 400
    response.end(JSON.stringify(error))
}
