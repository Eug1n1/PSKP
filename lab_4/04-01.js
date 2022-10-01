const http = require('http')
const url = require('url')
const DB = require('./DB')

let db = new DB.DB()

db.on('GET', (_req, res) =>
{
    res.end(JSON.stringify(db.select()))
})

db.on('POST', (req, res) =>
{
    req.on('data', (data) =>
    {
        let newLine = JSON.parse(data)
        result = db.insert(newLine)
        res.writeHead(200)
        res.end(JSON.stringify(result))
    })
})

db.on('PUT', (req, res) =>
{
    req.on('data', (data) =>
    {
        let newLine = JSON.parse(data)
        db.update(newLine)
    })
    res.writeHead(200)
    res.end("OK")
})

db.on('DELETE', (req, res) =>
{
    let queryData = url.parse(req.url, true).query
    let id = queryData.id
    // console.log(id)
    let line = db.delete(id)

    res.end(JSON.stringify(line))
})

http.createServer(((req, res) =>
{
    if (url.parse(req.url).pathname === '/api/db')
    {
        db.emit(req.method, req, res)
    }
})).listen(3000)
