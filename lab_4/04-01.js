const http = require('http')
const url = require('url')
const fs = require('fs')
const DB = require('./DB')

let db = new DB.DB()

db.on('GET', (req, res) =>
{
    res.end(JSON.stringify(db.get()))
})

db.on('POST', (req, res) =>
{
    req.on('data', (data) =>
    {
        let newLine = JSON.parse(data)
        db.post(newLine)
    })
})

db.on('PUT', (req, res) =>
{
    req.on('data', (data) =>
    {
        let newLine = JSON.parse(data)
        db.put(newLine)
    })
})

db.on('DELETE', (req, res) =>
{
    let id = req.query.id
    let line = db.delete(id)

    res.end(JSON.stringify(line))
})

http.createServer(((req, res) =>
{
    if(url.parse(req.url).pathname === '/')
    {

    }
    else if (url.parse(req.url).pathname === '/api/db')
    {
        db.emit(req.method, req, res``)
    }
})).listen(3000)