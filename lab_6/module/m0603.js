const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports.send = async (text) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.USER,
        to: process.env.TO,
        subject: 'send method', // Subject line
        html: `<b>${text}</b>`, // html body
    })
}
