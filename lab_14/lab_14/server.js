'use strict';
const http = require('http')
const getHandler = require('./gethandler')

http.createServer(function (req, res) {
  switch (req.method) {
    case 'GET':
        getHandler(req, res)
      break
    case 'POST':
      break
    case 'PUT':
      break
    case 'DELETE':
      break
    default:
      res.writeHead
  }
}).listen(3000);
