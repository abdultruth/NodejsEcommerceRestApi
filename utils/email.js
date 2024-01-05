'use strict';

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text')


class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = `${user.firstname} ${user.lastname}`;
        this.url = url;
        this.from =  `Abdullahi Salaam <${process.env.EMAIL_FROM}>`;

    }

    async createTransport() {
        if(process.env.NODE_ENV === 'production' ) {
            // SendGrid  
            return 1;
        } else {
            return nodemailer.createTransport({
            host: process,
            auth: {
                user: process.evn.EMAIL_USERNAME,
                pass: process.evn.EMAIL_PASSWORD,
            }
            // Activate in gmail "less secure app" option
          });
        }
    }

    // Send the actual email
    async send(template, subject) {
        // 1)Render HTML based on pug template
        const html = pug.renderFile(`${_dirname}/../views/emails/${template}.pug`, {
            Name: this.name,
            url: this.url,
            subject
        });

        // 2)Define email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        // 3) Create a transport and send email
        // remember await transporter.sendEmail(mailOptions)
        await this.createTransport(mailOptions)
        
    };

    async sendWecome() {
        await this.send('welcome', 'Welcome to the Abdultruth Ecommerce!');
    }


    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 5 minutes)!');
    }


}



module.export = {
    Email
}