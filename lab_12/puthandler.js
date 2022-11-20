const url = require('url')
const fs = require('fs')

const path = 'StudentList.json'

function putHandler(req, res, wsServer) {
    let urlObject = url.parse(req.url)

    switch (urlObject.pathname) {
        case '/':
            let data

            req.on('data', (data) => {
                let student = JSON.parse(data)
                let students = JSON.parse(fs.readFileSync(path).toString())

                let index = students.findIndex((x) => x.id === student.id)

                if (index === -1) {
                    res.writeHead(200)
                    res.end(
                        JSON.stringify(
                            {
                                error: 2,
                                message: `there is no student with id: ${index}`,
                            },
                            null,
                            '\t'
                        )
                    )

                    return
                }
                students[index] = student

                fs.writeFileSync(path, JSON.stringify(students))

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                })
                res.end(JSON.stringify(student, null, '\t'))
            })

            return

        default:
            res.writeHead(404)
            res.end()
            return
    }
}

module.exports.putHandler = putHandler
