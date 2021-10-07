const http = require('http')
const url = require('url')
const querystring = require('querystring')

let server = http.createServer((req, res) =>
{
    switch (req.method)
    {
        case 'GET':
            getHandler(req, res)
            break
        case 'POST':
            break
        default:
            res.end('ERROR')
    }

}).listen(3000)

function getHandler(req, res)
{
    let urlObject = url.parse(req.url)
    let queryObject = querystring.parse(urlObject.query)

    console.log(urlObject.pathname)

    switch (urlObject.pathname)
    {
        case '/connection':
            let timeout = queryObject.set;
            if (timeout)
            {
                server.keepAliveTimeout = Number(timeout);
                res.end(`KeepAliveTimeout=${timeout}`)
                return
            }

            res.end(server.keepAliveTimeout.toString())
            break
        case '/headers':

            // noinspection SpellCheckingInspection
            res.setHeader('moy-header','moe znachenie')

            let reqHeaders = ''
            for(let key in req.headers)
            {
                reqHeaders += `${key}: ${req.headers[key]}\n`
            }

            // let resHeaders = ''
            // for(let key in res.getHeaders())
            // {
            //     resHeaders += `${key}: ${res.headers[key]}\n`
            // }
            //
            // console.log(res.getHeaders())
            // console.log(resHeaders)

            res.end(`REQUEST:\n${reqHeaders}\nRESPONSE:`)
            break
        case '/parameter':
            let x = Number(queryObject.x)
            let y = Number(queryObject.y)

            if (!isNaN(x) && !isNaN(y))
            {
                res.write(`${x} + ${y} = ${x+y}\n`)
                res.write(`${x} - ${y} = ${x-y}\n`)
                res.write(`${x} * ${y} = ${x*y}\n`)
                res.write(`${x} / ${y} = ${x/y}\n`)
                res.end()
                return
            }

            res.writeHead(400)
            res.end('x or y is not a number')

            break
        case '/close':
            setTimeout(() => server.close(), 10000)
            res.end('server will be stopped after 10 sec')
            break
        case '/socket':
            res.write(`YOUR IP: ${req.socket.remoteAddress}\n`)
            res.write(`YOUR PORT: ${req.socket.remotePort}\n`)
            res.write(`SERVER IP: ${req.socket.localAddress}\n`)
            res.write(`SERVER PORT: ${req.socket.localPort}\n`)
            res.end()
            break
        case '/req-data':
            break
        case '/resp-status':
            let status = Number(queryObject.code)
            let message = queryObject.mess

            res.writeHead(status, message)
            res.end()
            break
        default:
            let parameterRgxMatches = urlObject.pathname.match('^\/parameter\/(.+)\/(.+)$')

            if (parameterRgxMatches)
            {
                let x = Number(parameterRgxMatches[1])
                let y = Number(parameterRgxMatches[2])

                if (!isNaN(x) && !isNaN(y))
                {
                    res.write(`${x} + ${y} = ${x+y}\n`)
                    res.write(`${x} - ${y} = ${x-y}\n`)
                    res.write(`${x} * ${y} = ${x*y}\n`)
                    res.write(`${x} / ${y} = ${x/y}\n`)
                    res.end()
                    return
                }

                res.writeHead(400)
                res.end(urlObject.pathname)

                return
            }

            res.writeHead(400)
            res.end('ERROR')
    }
}