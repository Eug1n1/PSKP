const url = require('url')

module.exports.postHandler = (request, response, Db) => {
    let data = ''

    let Urn = url.parse(request.url).pathname
    let path_mas = Urn.split('/')

    console.log(path_mas)

    switch (path_mas[2]) {
        case 'faculties':
            request.on('data', (chunk) => {
                data += chunk
            })

            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.postFaculty(data.faculty, data.faculty_name)
                    .then((_) => {
                        response.end(JSON.stringify(data))
                    })
                    .catch((error) => {
                        write_error_400(response, error.message)
                    })
            })
            break
        case 'pulpits':
            request.on('data', (chunk) => {
                data += chunk
            })

            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200)
                Db.postPulpit(data.pulpit, data.pulpit_name, data.faculty)
                    .then((_) => {
                        response.end(JSON.stringify(data))
                    })
                    .catch((error) => {
                        write_error_400(response, error.message)
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
                Db.postSubject(data.subject, data.subject_name, data.pulpit)
                    .then((_) => {
                        response.end(JSON.stringify(data))
                    })
                    .catch((error) => {
                        write_error_400(response, error.message)
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
                Db.postAuditoriumType(
                    data.auditorium_type,
                    data.auditorium_typename
                )
                    .then((_) => {
                        response.end(JSON.stringify(data))
                    })
                    .catch((error) => {
                        write_error_400(response, error.message)
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
                Db.postAuditorium(
                    data.auditorium,
                    data.auditorium_name,
                    data.auditorium_capacity,
                    data.auditorium_type
                )
                    .then((_) => {
                        response.end(JSON.stringify(data))
                    })
                    .catch((error) => {
                        write_error_400(response, error.message)
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
    response.end(JSON.stringify({
        error: error
    }))
}
