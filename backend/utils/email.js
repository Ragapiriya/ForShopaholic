//this function can be used anywhere, whenever we want to send emails

const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    }
    const transporter = nodemailer.createTransport(transport);
    transporter.sendMail()
}