const fs = require('fs')
const url = require('url')
const pathStatic = './static/lab14.html'

module.exports.getHandler = (req, res, Db) => {
    let Urn = url.parse(request.url).pathname
    let path_mas = Urn.split('/')

    switch (path_mas[2]) {
        case '/':
            fs.access(pathStatic, fs.constants.R_OK, (err) => {
                if (err) this.writeHTTP404(res)
                else
                    pipeFile(res, {
                        'Content-Type': 'text/html; charset=utf-8',
                    })
            })
            break
        case 'faculties':
            Db.get_faculties()
                .then((records) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(res, error)
                })
            break
        case 'pulpits':
            Db.get_pulpits()
                .then((records) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(res, error)
                })
            break
        case 'subjects':
            Db.get_subjects()
                .then((records) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(res, error)
                })
            break
        case 'auditoriumstypes':
            Db.get_auditoriums_types()
                .then((records) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(res, error)
                })
            break
        case 'auditorims':
            Db.get_auditorims()
                .then((records) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {
                    write_error_400(res, error)
                })
            break
        default:
            let facultyPulpitsRegex = /\/api\/faculty\/(\w+)\/pulpits/
            let auditoriumtypesAuditoriumsRegex =
                /\/api\/auditoriumtypes\/(\w+)\/auditoriums/

            let match = auditoriumtypesAuditoriumsRegex.exec(path)
            if (match) {
                Db.getAuditoriumByType(match[1])
                    .then((records) => {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'application/json')
                        res.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {
                        write_error_400(res, error)
                    })

                return
            }

            match = facultyPulpitsRegex.exec(path)
            if (match) {
                Db.getFacultyPulpits(match[1])
                    .then((records) => {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'application/json')
                        res.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {
                        write_error_400(res, error)
                    })

                return
            }

            write_error_400(res, 'Invalid method')
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
    response.end('<h1>error</h1></br>' + '<h3>' + error + '</h3>')
}
