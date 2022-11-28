const url = require('url')

module.exports.putHandler = (request, response, Db) => {
    let data = ''

    let Urn = url.parse(request.url).pathname
    let path_mas = Urn.split('/')

    switch (path_mas[2]) {
        case 'faculties':
            request.on('data', (chunk) => {
                data += chunk
            })
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.get_faculty(data.faculty)
                    .then((records) => {
                        if (records.recordset.length == 0) {
                            throw 'No such faculty'
                        }

                        Db.put_faculties(data.faculty, data.faculty_name)
                            .then((_) => {
                                response.end(JSON.stringify(data))
                            })
                            .catch((error) => {
                                write_error_400(response, error)
                            })
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })
            })
            break
        case 'pulpits':
            request.on('data', (chunk) => {
                data += chunk
            })

            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })

                Db.get_pulpit(data.pulpit)
                    .then((records) => {
                        if (records.recordset.length == 0) {
                            throw 'No such pulpit'
                        }

                        Db.put_pulpits(
                            data.pulpit,
                            data.pulpit_name,
                            data.faculty
                        )
                            .then((_) => {
                                response.end(JSON.stringify(data))
                            })
                            .catch((error) => {
                                write_error_400(response, error)
                            })
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })
            })
            break
        case 'subjects':
            request.on('data', (chunk) => {
                data += chunk
            })
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })

                Db.get_subject(data.subject)
                    .then((records) => {
                        if (records.recordset.length == 0) {
                            throw 'No such subject'
                        }

                        Db.put_subjects(
                            data.subject,
                            data.subject_name,
                            data.pulpit
                        )
                            .then((_) => {
                                response.end(JSON.stringify(data))
                            })
                            .catch((error) => {
                                write_error_400(response, error)
                            })
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })
            })
            break
        case 'auditoriumstypes':
            request.on('data', (chunk) => {
                data += chunk
            })
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })

                Db.get_auditorium_type(data.auditorium_type)
                    .then((records) => {
                        if (records.recordset.length == 0) {
                            throw 'no such auditorium_type'
                        }

                        Db.put_auditoriums_types(
                            data.auditorium_type,
                            data.auditorium_typename
                        )
                            .then((_) => {
                                response.end(JSON.stringify(data))
                            })
                            .catch((error) => {
                                write_error_400(response, error)
                            })
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })
            })
            break
        case 'auditorims':
            request.on('data', (chunk) => {
                data += chunk
            })
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })

                Db.get_auditorim(data.auditorium)
                    .then((records) => {
                        if (records.recordset.length == 0) {
                            throw 'No such auditorium'
                        }

                        Db.put_auditoriums(
                            data.auditorium,
                            data.auditorium_name,
                            data.auditorium_capacity,
                            data.auditorium_type
                        )
                            .then((_) => {
                                response.end(JSON.stringify(data))
                            })
                            .catch((error) => {
                                write_error_400(response, error)
                            })
                    })
                    .catch((error) => {
                        write_error_400(response, error)
                    })
            })
            break
        default:
            write_error_400(response, 'Invalid method')
            break
    }
}

function write_error_400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end('<h1>error</h1></br>' + '<h3>' + error + '</h3>')
}
