const url = require('url')
const fs = require('fs')

const path = 'StudentList.json'

function putHandler(req, res, wsServer)
{
    let urlObject = url.parse(req.url)

    switch (urlObject.pathname)
    {
        case '/':
            let data

            req.on('data', data =>
            {
                let student = JSON.parse(data)
                let students = JSON.parse(fs.readFileSync(path).toString())

                let index = students.findIndex(x => x.id === student.id)

                if (index !== -1)
                {
                    students[index] = student

                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(student, null, '    '))

                    fs.writeFileSync(path, JSON.stringify(students))
                    // wsServer.emit('change')
                    return
                }

                res.writeHead(404)
                res.end('ERROR')
            })

            return
    }
}

module.exports.putHandler = putHandler