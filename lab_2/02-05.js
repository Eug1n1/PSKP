let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {

    if  (req.url === "/fetch") {
        if (req.method === "GET") {
            let html = fs.readFileSync("./fetch.html")
            res.writeHead(200, {"Content-Type": "text/html charset=utf-8"})
            res.end(html)
        }
    }

    if(req.url === "/api/name") {
        if (req.method === "GET") {
            path = "text.txt"
            fs.stat(path, (err, stats) => {
                    if (err != null)
                    {
                        console.log(err)
                    }

                    let text = fs.readFileSync(path)
                    res.writeHead(200, {"Content-Type": "text/plain charset=utf-8", "Content-Length": stats.size})
                    res.end(text, "binary")
            })
        }
    }

}).listen(3000)
