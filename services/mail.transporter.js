require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT || 587,
  secure: process.env.MAIL_SECURE === 'true',
  // secureConnection: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  logger: false,
  debug: true
});

module.exports = transporter;