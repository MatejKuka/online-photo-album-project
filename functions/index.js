const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

exports.sendWelcomingMail = functions.auth.user().onCreate((user, context) => {
    const transporter = nodemailer.createTransport({
        //service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "onlinephotoalbum@gmail.com",
            pass: "testingTest123",
        },
    });

    const mailOptions = {
        from: "OPAP <onlinephotoalbum@gmail.com>",
        to: "matokuka66@gmail.com",
        subject: "Welcome",
        html: `Welcome in our Online Photo Album Project. Your account is sucessfully created.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.toString());
        }
        console.log("Sended");
    })
});


