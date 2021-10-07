const nodemailer = require('nodemailer')
const http = require('http')
const url = require('url')
const fs = require('fs')
const  qs = require('querystring');


async function main(user, pass, to) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: pass, // generated ethereal password
    },
  })
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'vldshss@gmail.com', // sender address
    to: to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })
}


http.createServer((req, res) =>
{
    let parsedUrl = url.parse(req.url);

    switch (parsedUrl.pathname)
    {
        case '/api/sendmail':
            if (req.method === 'POST')
            {
                let query = '';

                req.on('data', chunk =>
                {
                    query += chunk;
                });

                let data = null;

                req.on('end', () => {
                    data =  qs.parse(query);

                    main(data.user, data.pass, data.to).then(()=>
                    {
                        res.end('OK')
                    }).catch(reason =>
                    {
                        res.end(reason.toString())
                    })

                });

            }
            break
        case '/':
            let html = fs.readFileSync("./index.html");
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(html);
            break
    }
}).listen(3000)


