import express from "express";
import { userDate } from "./Constants/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "UnAuthorized!",
      success: false,
    });
  }
  next();
};

app.get("/profile", (req, res) => {
  res.status(200).json({
    data: userDate,
    success: true,
  });
});

app.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    if (data.email === userDate.email) {
      return res.status(409).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    const HashPassword = await bcrypt.hash(data.password, 10);
    console.log(HashPassword);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const comparedPassword = await bcrypt.compare(password, userDate.password);
    if (email !== userDate.email || !comparedPassword) {
      return res.status(404).json({
        message: "Invalid Credentilas!",
        success: false,
      });
    }
    const token = jwt.sign(
      { _id: userDate.id },
      "123123123fdjsklaalsfdjkafsld",
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "You have loged in succesfully!",
      success: true,
      data: { ...req.body, token },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong!",
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
