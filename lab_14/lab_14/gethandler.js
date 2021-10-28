'use strict'
const url = require('url')
const sql = require('mssql')

const config = {
  user: 'sa',
  password: 'Pass-123',
  server: 'localhost',
  database: 'lab_14'
}

function getHandler(req, res) {
  let urlObject = url.parse(req.url);

  switch (urlObject.pathname) {
    case '/':

      return
    case '/api/faculties':
    case '/api/pulpits':
    case '/api/subjects':
    case '/api/auditoriumstypes':
    case '/api/auditorims':
      let table = urlObject.pathname.match(/\/api\/(\w+)/)[1]

      let resultset = selectQuery(table)

      res.writeHead(200)
      res.end(JSON.stringify(resultset))

      return
    default:
      res.writeHead(404)
      res.end()
  }
}

function selectQuery(table) {
  sql.connect(config, err => {
    if (err) {
      console.log('connection error')
    }

    let request = new sql.Request()

    request.selectQuery(`select * from ${table}`, (err, recordset) => {
      if (err) {
        console.log('requst error')
      }

      return recordset
    })
  })
}