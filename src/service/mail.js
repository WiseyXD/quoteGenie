"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(content,users) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Aryan Nagbanshi 👻" <aryan@JS.com>', // sender address
        to: ["harshitamore16@gmail.com","aryan.s.nag@gmail"], // list of receivers
        subject: "Test Array", // Subject line
        text: "Test", // plain text body
        html: "<b>Test Array</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

module.exports = main;
