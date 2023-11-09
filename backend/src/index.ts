import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
require("dotenv").config();
import connectDB from "./database";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import userListingRoutes from "./routes/userListing.route";
import listingsRoutes from "./routes/listings.route";
import { APITYPE } from "./utils/endpoints";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

//** Middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//** Middleware custom functions */
app.use(APITYPE.USER, userRoutes);
app.use(APITYPE.AUTH, authRoutes);
app.use(APITYPE.USER_LISTING, userListingRoutes);
app.use(APITYPE.LISTINGS, listingsRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
