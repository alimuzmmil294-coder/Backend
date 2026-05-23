import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
  to: "muhammadnomank12@gmail.com",
  subject: "Testing NodeMailer",
  text: "Da Muzammili Email!, sa hlt da email da nodemailer library na send kra de",
};

app.get("/", (req, res) => {
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "Email Sent Successfully!, Check Your Inbox",
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
