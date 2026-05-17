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
    });
  }
});

// app.post("/signup", (req, res) => {});
app.listen(4000, () => {
  console.log("http://localhost:4000");
});
