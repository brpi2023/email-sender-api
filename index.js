require("dotenv").config();
var nodemailer = require("nodemailer");
var cors = require("cors");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("Hello User");
});
app.post("/sendMail", (req, res) => {
  console.log(req.body);

  const mailOptionsCustomer = {
    from: process.env.EMAIL,

    to: req.body.email,
    subject: "FORM PURCHASE",
    text: req.body.data,
  };
  transporter.sendMail(mailOptionsCustomer, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  const mailOptionsAdmin = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "FORM PURCHASE",
    text: req.body.data,
  };
  transporter.sendMail(mailOptionsAdmin, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.json(req.body);
});

app.listen(port, () => {
  console.log("App started");
});
