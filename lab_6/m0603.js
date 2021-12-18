const nodemailer = require("nodemailer");
module.exports.send = async (text) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vldshss2000@gmail.com',
            pass: 'vladoshuesos',
        },
    })

    let info = await transporter.sendMail({
        from: 'vldshss@gmail.com',
        to: 'jusapcourse@gmail.com',
        subject: 'send method',
        html: `<b>${text}</b>`,
    })
}