"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'aryan.s.nag@gmail.com',
        pass: 'WRk8rFB1MTJ49E25'
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Aryan Nagbanshi 👻" <aryan@JS.com>', // sender address
        to: "harshitamore16@gmail.com", // list of receivers
        subject: "Hey Bot, Ari here", // Subject line
        text: "Test", // plain text body
        html: "<b>Hey Bot created something small but great</b>", // html body
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
