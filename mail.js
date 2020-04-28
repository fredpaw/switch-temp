var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "fredpaw@hotmail.com",
    pass: "",
  },
});

const sendAlert = (content) => {
  var mailOptions = {
    from: "fredpaw@hotmail.com",
    to: "fredpaw@gmail.com",
    subject: "Sending Email using Node.js",
    html: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendAlert;
