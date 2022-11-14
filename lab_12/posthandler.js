const url = require('url')
const fs = require('fs')

const path = 'StudentList.json'

function postHandler(req, res, wsServer) {
    let urlObject = url.parse(req.url)

    switch (urlObject.pathname) {
        case '/':
            req.on('data', (data) => {
                let student = JSON.parse(data)
                let students = JSON.parse(fs.readFileSync(path).toString())

                let check = students.filter((item) => {
                    return item.id === student.id
                })

                if (check.length > 0) {
                    res.writeHead(400)
                    res.end(
                        JSON.stringify(
                            {
                                error: 3,
                                message: `student with id ${student.id} already exists`,
                            },
                            null,
                            '\t'
                        )
                    )

                    return
                }
                // wsServer.emit('change')
                students.push(student)
                fs.writeFileSync(path, JSON.stringify(students))

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                })
                res.end(data)
            })

            return
        case '/backup':
            let date = new Date()
            let result = date
                .toISOString()
                .match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):\d{2}:(\d{2}).+$/)

            let newPath = `${result[1]}${result[2]}${result[3]}${result[4]}${result[5]}_${path}`

            if (fs.existsSync(newPath)) {
                res.end('file already exists')
                return
            }

            setTimeout(() => {
                fs.copyFileSync(path, newPath)
                res.end('OK')
            }, 2000)
            return
    }
}

module.exports.postHandler = postHandler
