var http = require('http');
var url = require("url");

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

http.createServer(function (req, resp)
    {
        var parsedUrl = url.parse(req.url, true); // true to get query as object
        var queryAsObject = parsedUrl.query;

        if( req.method === "GET" )
        {
            if (parsedUrl.pathname === "/fact")
            {
                let k = queryAsObject.k;
                resp.writeHead(200, {'Content-Type': 'text/json'});
                resp.end(JSON.stringify({k: k, fact: factorial(k)}))
            }
        }
    }
).listen(3000);