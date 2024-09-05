const passwordReset = require("../emailTemplates/password.reset");
const transporter = require('../services/mail.transporter')

const NODE_ENV = process.env.NODE_ENV;
const PROD_FRONTEND = process.env.PROD_FRONTEND;
const DEV_FRONTEND = process.env.DEV_FRONTEND;


const sendResetLink = async (user, hashedToken, response) => {
    // Password Reset link
    const passwordResetLink = `${
      NODE_ENV === "development" ? PROD_FRONTEND : DEV_FRONTEND
    }/auth/password/reset/${hashedToken}`;
  
    // Send email
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Link",
      html: passwordReset(user, passwordResetLink),
    };
  
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return true;
    } catch (error) {
      console.error("Error sending Password Reset link:", error);
      response
        .status(500)
        .send({ error: 1, message: "Error sending Password Reset link" });
    }
  };

  module.exports = {
    sendResetLink
  }