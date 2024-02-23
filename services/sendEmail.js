require('dotenv').config()
const sgMail = require("@sendgrid/mail");
const { SENDGRID_TOKEN } = process.env;
sgMail.setApiKey(SENDGRID_TOKEN);

const sendEmail = async (data) => {
    const email = { ...data, from: "sesbohdan@gmail.com" };
    await sgMail.send(email);
    return true;
};

module.exports = { sendEmail };