import express from "express";
import nodemailer from "nodemailer";
import dotenv, { config } from "dotenv";
import multer from "multer";
import path from "path";
// import { error, log } from "console";
import { buffer } from "stream/consumers";
import { resolve } from "dns";
import { rejects } from "assert";
import { cloudinary, configCloudinary } from "./config/cloudinary.js";
// import { Stream } from "nodemailer/lib/xoauth2.js";
import { uploadBlog } from "./config/multer.js";

config();
configCloudinary();

const app = express();
app.use(express.json());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     const unqSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + unqSuffix + path.extname(file.originalname),
//     );
//   },
// });

// const upload = multer({
//   storage,
// });

// app.post("/uploadImage", upload.single("coverImage"), (req, res) => {
//   const file = req.file;
//   const body = req.body;
//   console.log(file, body);
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
//     );
//   },
// });
// const upload = multer({ storage });

// app.post("/uploadImage", upload.single("coverImage"), (req, res) => {
//   const file = req.file;
//   const body = req.body;
//   console.log(file, body);
//   res.status(200).json({
//     message: "Image uploaded successfully",
//     success: true,
//   });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});
const uplaod = multer({ storage });

app.post("/uploadFile", uplaod.single("coverImageBC"), (req, res) => {
  const file = req.file;
  const body = req.body;
  console.log(file, body);
  res.json({
    message: "Image Uploaded Successfully!",
    success: true,
  });
});

const uploadCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    stream.end(buffer);
  });
};
app.post("/uploadBlog", uploadBlog.single("blogImages"), async (req, res) => {
  const file = req.file;
  const body = req.body;
  if (!file) {
    return res
      .status(400)
      .json({ message: "Upload Your File!!", success: false });
  }
  const result = await uploadCloudinary(file.buffer);
  res.status(200).json({
    message: "Blog Uploaded Successfully!",
    success: true,
    data: result.secure_url,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
