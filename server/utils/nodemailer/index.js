var nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "youremailpassword",
    },
  });
  var mailOptions = {
    from: "youremail@gmail.com",
    to: "myfriend@yahoo.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
