const express = require("express");
const router = express.Router();
// const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(5000, () => {
  console.log('HTTP Server running on port 5000');
});


const contactEmail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const subject = req.body.subject;
  const destinationEmail = req.body.destinationEmail;
  const mail = {
    from: email,
    to: destinationEmail,
    subject: subject,
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Thank's for the Message!" });
    }
  });
});

