const url = require('url')

module.exports.deleteHandler = (request, response, Db) => {
    let Urn = url.parse(request.url).pathname

    let path_mas = Urn.split('/')

    switch (path_mas[2]) {
        case 'faculties':
            response.writeHead(200, { 'Content-Type': 'application/json' })
            Db.get_faculty(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such faculty'
                    }

                    Db.delete_faculties(path_mas[3])
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
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.get_pulpit(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such pulpit'
                    }

                    Db.delete_pulpits(path_mas[3])
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
            Db.get_subject(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such subject'
                    }

                    Db.delete_subjects(path_mas[3])
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
            Db.get_auditorium_type(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'No such auditorium type'
                    }

                    Db.delete_auditoriums_types(path_mas[3])
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
            Db.get_auditorim(path_mas[3])
                .then((records) => {
                    if (records.recordset.length == 0) {
                        throw 'no such auditorium'
                    }

                    Db.delete_auditoriums(path_mas[3])
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
    response.end('<h1>error</h1></br>' + '<h3>' + error + '</h3>')
}
