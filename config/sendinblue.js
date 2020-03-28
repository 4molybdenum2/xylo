const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "pranshutejas@gmail.com",
    pass: "1EtRfA2p6zYZKn4G"
  }
});

transporter.verify((error, success) => {
  if (error) console.error(error);
  else module.exports = transporter;
});
