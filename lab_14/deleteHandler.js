const url = require('url')

module.exports.deleteHandler = (request, response, Db) => {
    let Urn = url.parse(request.url).pathname

    let path_mas = Urn.split('/')

    switch (path_mas[2]) {
        case 'faculties':
            response.writeHead(200, { 'Content-Type': 'application/json' })

            Db.getFaculty(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such faculty'
                    }

                    Db.deleteFaculty(path_mas[3])
                        .then(() => {
                            response.end(
                                JSON.stringify(records.recordset[0])
                            )
                        })
                        .catch((error) => {
                            write_error_400(response, error)
                        })
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'pulpits':
            response.writeHead(200)

            Db.getPulpit(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such pulpit'
                    }

                    Db.deletePulpit(path_mas[3])
                        .then((_) => {
                            response.end(
                                JSON.stringify(records.recordset[0])
                            )
                        })
                        .catch((error) => {
                            write_error_400(response, error)
                        })
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'subjects':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getSubject(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such subject'
                    }

                    Db.deleteSubject(path_mas[3])
                        .then((_) => {
                            response.end(
                                JSON.stringify(records.recordset[0])
                            )
                        })
                        .catch((error) => {
                            write_error_400(response, error)
                        })
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'auditoriumstypes':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getAuditoriumType(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such auditorium type'
                    }

                    Db.deleteAuditoriumType(path_mas[3])
                        .then((_) => {
                            response.end(
                                JSON.stringify(records.recordset[0])
                            )
                        })
                        .catch((error) => {
                            write_error_400(response, error)
                        })
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        case 'auditorims':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getAuditorium(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'no such auditorium'
                    }

                    Db.deleteAuditorium(path_mas[3])
                        .then((_) => {
                            response.end(
                                JSON.stringify(records.recordset[0])
                            )
                        })
                        .catch((error) => {
                            write_error_400(response, error)
                        })
                })
                .catch((error) => {
                    write_error_400(response, error)
                })
            break
        default:
            write_error_400(response, 'Invalid method')
            break
    }
}

function write_error_400(response, error) {
    response.statuscode = 400
    response.statusmessage = 'invalid method'
    response.end(JSON.stringify({
        error: error
    }))
}
