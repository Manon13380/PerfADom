const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    hôte: "smtp.gmail.com",
    port: 465,
    sécurisé: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PW
    }
});




module.exports = transporter