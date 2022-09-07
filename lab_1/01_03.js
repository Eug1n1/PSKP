var http = require('http');

let printHeaders = (request) =>
{
    let headers = "";

    for(let key in request.headers)
    {
        headers += `<h3> ${key} : ${request.headers[key]}</h3>`
    }

    return headers;
}

http.createServer(function (request, response)
    {
        let body = '';

        response.writeHead(200, {'Content-Type': 'text/html'});

        request.on('data', str =>
            {
                body += str;
            }
        )

        request.on('end', () =>
            {
                response.end(
                    ` <html>
                            <head></head>
                            <body>
                            <h2>method: ${request.method}</h2>
                            <h2>uri: ${request.url}</h2>
                            <h2>version: ${request.httpVersion}</h2>
                            <h2>headers: ${printHeaders(request)}</h2>
                            <h2>body: ${body}</h2>
                            </body>
                            </html>`
                )
            }
        )
    }
).listen(3000)
