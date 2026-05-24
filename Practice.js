import express, { text } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSCODE,
  },
});

const mailOptions = {
  from: process.env.USER_EMAIL,
  to: "alimuzmmil294@gmail.com",
  subject: "Muzammil's Email!",
  text: "This is the email that Muzammil Ali sent You!!",
};

app.get("/", (req, res) => {
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          HelloWorld: "This is the email that Muzammil Ali sent You!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "Email sent successfully!, Check your mail!",
          success: true,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
