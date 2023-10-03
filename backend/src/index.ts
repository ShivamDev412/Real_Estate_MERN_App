import express from "express";
require("dotenv").config();
import connectDB from "./database";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
