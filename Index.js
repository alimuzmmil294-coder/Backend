import express from "express";
import { userDate } from "./Constants/user.js";


const app = express();

app.post("/post", (req, res) => {
    const data = userDate;
})