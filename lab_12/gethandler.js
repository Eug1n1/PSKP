const url = require('url')
const fs = require('fs')

const path = 'StudentList.json'

function getHandler(req, res)
{
    let urlObject = url.parse(req.url)

    switch (urlObject.pathname)
    {
        case '/':
            let file = fs.readFileSync(path)
            let students = JSON.parse(file.toString())

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(students, null, '\t'))

            return

        case '/backup':

            fs.readdir(__dirname, (err, files) =>
            {
                if (err)
                {
                    console.error(err)
                }

                files.forEach(file =>
                {
                    let fileMatch = file.match(/^\d{12}_StudentList.json$/)

                    if (fileMatch)
                    {
                        res.write(fileMatch[0] + '\n')
                    }
                })

                res.end()
            })


            return

        default:
            let idMatch = urlObject.pathname.match(/\/(\d+)$/)
            if (idMatch)
            {

                let file = fs.readFileSync(path)
                let students = JSON.parse(file.toString())

                let student = students.filter(student =>
                {
                    return student.id === Number(idMatch[1])
                })

                if (student.length === 0)
                {
                    res.writeHead(404)
                    res.end('ERROR')

                    return
                }

                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(student))

                return
            }

            res.writeHead(400)
            res.end('ERROR')
            return
    }
}

module.exports.getHandler = getHandler