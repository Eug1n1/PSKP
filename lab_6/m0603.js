const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports.send = async (text) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    })

    let info = await transporter.sendMail({
        from: process.env.USER,
        to: process.env.TO,
        subject: 'send method',
        html: `<b>${text}</b>`,
    })
}
