const http = require('http')
const url = require("url")
const fs = require("fs")

function factorial(n) {
  return n >= 1 ? n * factorial(n - 1) : 1
}

http.createServer(function (req, res) {
    let parsedUrl = url.parse(req.url, true)
    let queryAsObject = parsedUrl.query

    let path
    if (req.method === "GET") {
      if (parsedUrl.pathname === "/fact") {
        let k = queryAsObject.k
        res.writeHead(200, {'Content-Type': 'text/json'})
        res.end(JSON.stringify({k: k, fact: factorial(k)}))
      }

      if (parsedUrl.pathname === "/") {
        path = "03-03.html"

        fs.stat(path, (err, stats) => {
            if (err != null) {
              console.log(err)
            }

            let text = fs.readFileSync(path)
            res.writeHead(200, {"Content-Type": "text/html charset=utf-8", "Content-Length": stats.size})
            res.end(text, "binary")
          }
        )
      }
    }
  }
).listen(3000)