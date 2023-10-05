import express from "express";
import cors from "cors";
require("dotenv").config();
import connectDB from "./database";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import { APITYPE } from "./utils/endpoints";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(APITYPE.USER, userRoutes);
app.use(APITYPE.AUTH, authRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
