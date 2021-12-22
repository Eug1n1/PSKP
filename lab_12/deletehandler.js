// let index = db_data.findIndex(x => x.id === Number(id))
// let elementJson = db_data[index]
// db_data.splice(index, 1)

const url = require('url')
const fs = require('fs')

const path = 'StudentList.json'

function deleteHandler(req, res, wsServer)
{
    let urlObject = url.parse(req.url)

    switch (urlObject.pathname)
    {
        default:
            let idMatch = urlObject.pathname.match(/^\/(\d+)$/)
            let backupMatch = urlObject.pathname.match(/^\/backup\/(\d{4})(\d{2})(\d{2})$/)

            if (idMatch)
            {
                let file = fs.readFileSync(path)
                let students = JSON.parse(file.toString())

                let index = students.findIndex(x => x.id === Number(idMatch[1]))
                let student = students[index]
                students.splice(index, 1)

                fs.writeFileSync(path, JSON.stringify(students))
                // wsServer.emit('change')
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(student, null, '    '))

                return
            }
            else if (backupMatch)
            {
                let year = Number(backupMatch[1])
                let month = Number(backupMatch[2])
                let day = Number(backupMatch[3])

                let deleteDate = new Date(year, month, day)

                fs.readdir(__dirname, (err, files) =>
                {
                    if (err)
                    {
                        console.error(err)
                    }

                    files.forEach(file =>
                    {
                        let fileMatch = file.match(/^(\d{4})(\d{2})(\d{2})\d{4}_StudentList.json$/)

                        if (fileMatch)
                        {
                            console.log(file)

                            let year = Number(fileMatch[1])
                            let month = Number(fileMatch[2])
                            let day = Number(fileMatch[3])

                            let my_date = new Date(year, month, day)

                            if (my_date < deleteDate)
                            {
                                fs.unlinkSync(fileMatch[0])
                                res.write(fileMatch[0])
                            }
                        }
                    })
                })

                res.end()

                return
            }

            res.writeHead(400)
            res.end('ERROR')
    }
}

module.exports.deleteHandler = deleteHandler