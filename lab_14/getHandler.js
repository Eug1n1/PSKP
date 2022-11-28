const fs = require('fs')
const url = require('url')
const pathStatic = './index.html'

module.exports.getHandler = (request, response, Db) => {
    let Urn = url.parse(request.url).pathname
    let path_mas = Urn.split('/')

    switch (path_mas[2]) {
        case undefined:
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    throw err
                }
                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                })
                response.end(data)
            })
            // fs.access(pathStatic, fs.constants.R_OK, (err) => {
            //     if (err) {
            //         this.writeHTTP404(response)
            //         return
            //     }

            //     pipeFile(response, {
            //         'Content-Type': 'text/html; charset=utf-8',
            //     })
            // })
            break
        case 'faculties':
            Db.getFaculties()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'pulpits':
            Db.getPulpits()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'subjects':
            Db.getSubjects()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'auditoriumstypes':
            Db.getAuditoriumTypes()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'auditorims':
            Db.getAuditoriums()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        default:
            let facultyPulpitsRegex = /\/api\/faculty\/(\w+)\/pulpits/
            let auditoriumtypesAuditoriumsRegex =
                /\/api\/auditoriumtypes\/(\w+)\/auditoriums/

            let match = auditoriumtypesAuditoriumsRegex.exec(Urn)
            if (match) {
                Db.getAuditoriumByType(match[1])
                    .then((records) => {
                        response.statusCode = 200
                        response.setHeader('Content-Type', 'application/json')
                        response.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })

                break
            }

            match = facultyPulpitsRegex.exec(Urn)
            if (match) {
                Db.getPulpitsByFaculty(match[1])
                    .then((records) => {
                        response.statusCode = 200
                        response.setHeader('Content-Type', 'application/json')
                        response.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })

                break
            }

            write_error_400(response, 'Invalid method')
            break
    }
}

let pipeFile = (response, headers) => {
    response.writeHead(200, headers)
    fs.createReadStream(pathStatic).pipe(response)
}

function write_error_400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(
        JSON.stringify({
            error: error,
        })
    )
}
