const nodemailer = require('nodemailer')
const http = require('http')
const url = require('url')
const fs = require('fs')
const qs = require('querystring')
require('dotenv').config()

async function main(
    user = process.env.EMAIL,
    pass = process.env.PASS,
    to = process.env.EMAIL,
    text
) {
    user = user.trim()
    pass = pass.trim()
    to = to.trim()

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: user != '' ? user : process.env.EMAIL,
            pass: pass != '' ? pass : process.env.PASS,
        },
    })

    let info = await transporter.sendMail({
        from: user != '' ? user : process.env.EMAIL,
        to: to != '' ? to : process.env.TO,
        subject: text,
        text: text,
    })
}

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url)

    switch (parsedUrl.pathname) {
        case '/api/sendmail':
            if (req.method === 'POST') {
                let query = ''

                req.on('data', (chunk) => {
                    query += chunk
                })

                let data = null

                req.on('end', () => {
                    data = qs.parse(query)

                    main(data.user, data.pass, data.to, data.text)
                        .then(() => {
                            res.end('OK')
                        })
                        .catch((reason) => {
                            res.end(reason.toString())
                        })
                })
            }
            break
        case '/':
            let html = fs.readFileSync('./index.html')
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
            break
    }
}).listen(3000)
