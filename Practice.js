<<<<<<< HEAD
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
=======
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userDate } from "./Constants/user.js";
// import userData from "./Constants/user.js";

const app = express();

app.use(express.json());

// app.post("/profile", (req, res) => {
//   const token = req.headers?.authorization?.split(" ")[1];
//   console.log(token);
// });

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
  next();
};

app.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    if (data.email === userDate.email) {
      return res.status(409).json({
        message: "Already Exists!",
        success: false,
      });
    }

    const HashedPassword = await bcrypt.hash(data.password, 10);
    console.log(HashedPassword);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== userDate.email || password !== userDate.password) {
      return res.status(404).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const token = jwt.sign(
      { _id: userDate.id },
      "jkadsfkadsfjskdf4932234092349",
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "You have loged in Successfully!",
      data: {
        ...req.body,
        token,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
>>>>>>> 1870f4c3df51818deb99a44f447647844e786d90
    });
  }
});

<<<<<<< HEAD
app.listen(3000, () => {
  console.log("Server is running on port 3000");
=======
// app.post("/signup", (req, res) => {});
app.listen(4000, () => {
  console.log("http://localhost:4000");
>>>>>>> 1870f4c3df51818deb99a44f447647844e786d90
});
