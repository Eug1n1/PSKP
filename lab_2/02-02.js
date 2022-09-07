let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
    if (req.url === "/png") {
        if (req.method === "GET") {
            path = "pic.png"
            let image = null
            fs.stat(path, (err, stats) => {
                if (err != null) {
                    console.log(err)
                }

                image = fs.readFileSync(path)
                res.writeHead(200, {"Content-Type": "image/png", "Content-Length": stats.size})
                res.end(image, "binary")
            })
        }
    }
}).listen(3000)
