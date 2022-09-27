const nodemailer = require('nodemailer');
const mailConfig = require("../config/mailConfig");

class Mailer {
    constructor({recipient, subject, htmlString}) {
        this.mailOptions = {
            from: mailConfig.fromName + "<" + mailConfig.fromMail + ">", // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: "", // plain text body
            html: htmlString, // html body
        }
    }

    async sendMailToRecipient() {

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            service: mailConfig.service,
            auth: {
                user: mailConfig.auth.user,
                pass: mailConfig.auth.pass,
            },
        });

        let info = await transporter.sendMail(this.mailOptions);
        return nodemailer.getTestMessageUrl(info);
    }

}

module.exports = Mailer;
