const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "onlinephotoalbumproject@gmail.com",
        pass: "twezdtwmxtrtkhcs",
    },
});

exports.sendWelcomingMail = functions.auth.user().onCreate((user, context) => {

    const mailOptions = {
        from: "OPAP <onlinephotoalbumproject@gmail.com>",
        to: user.email,
        subject: "Welcome",
        html: `Thanks in our Online Photo Album Project. Your account is successfully created.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.toString());
        }
        console.log("Sended");
    })
});
