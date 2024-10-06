//this function can be used anywhere, whenever we want to send emails

const nodemailer = require('nodemailer');

const sendEmail = async options => {

    //details of email server we're using [mailtrap.com]
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    }

    //integrating the npm email package[nodemailer] with 3rd party email server
    const transporter = nodemailer.createTransport(transport);
    const message = {
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text: options.message,
    }
    await transporter.sendMail(message);
}
module.exports = sendEmail;
