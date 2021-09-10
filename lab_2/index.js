var http = require("http");
var fs = require("fs");

http.createServer(function (req, res)
{
    let path = "";

    if (req.url == "/")
    {
        let html = fs.readFileSync("./02-01.html");
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(html);
    }

    if (req.url === "/png")
    {
        if (req.method === "GET")
        {
            path = "pic.png"
            let image = null;
            fs.stat(path, (err, stats) =>
            {
                if (err != null)
                {
                    console.log(err);
                }

                image = fs.readFileSync(path);
                res.writeHead(200, {"Content-Type": "image/png", "Content-Length": stats.size});
                res.end(image, "binary");
            });
        }
    }

    if(req.url === "/api/name")
    {
        if (req.method === "GET")
        {
            path = "text.txt"
            fs.stat(path, (err, stats) =>
                {
                    if (err != null)
                    {
                        console.log(err);
                    }

                    let text = fs.readFileSync(path);
                    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8", "Content-Length": stats.size});
                    res.end(text, "binary");
                }
            );
        }
    }

    if  (req.url === "/xmlhttprequest")
    {
        if (req.method === "GET")
        {
            let html = fs.readFileSync("./xmlhttprequest.html");
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(html);
        }
    }

    if  (req.url === "/fetch")
    {
        if (req.method === "GET")
        {
            let html = fs.readFileSync("./fetch.html");
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(html);
        }
    }

    if  (req.url === "/jquery")
    {
        if (req.method === "GET")
        {
            let html = fs.readFileSync("./jquery.html");
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(html);
        }
    }

}).listen(3000);