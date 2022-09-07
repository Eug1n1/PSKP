let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
    if(req.url === "/api/name") {
        if (req.method === "GET") {
            path = "text.txt"
            fs.stat(path, (err, stats) => {
                    if (err != null) {
                        console.log(err)
                    }

                    let text = fs.readFileSync(path)
                    res.writeHead(200, {"Content-Type": "text/plain charset=utf-8", "Content-Length": stats.size})
                    res.end(text)
            })
        }
    }
}).listen(3000)
