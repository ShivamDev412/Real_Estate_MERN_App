import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
require("dotenv").config();
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import connectDB from "./src/database";
import userRoutes from "./src/routes/user.route";
import authRoutes from "./src/routes/auth.route";
import userListingRoutes from "./src/routes/userListing.route";
import listingsRoutes from "./src/routes/listings.route";
import { APITYPE } from "./src/utils/endpoints";
import { errorMiddleware } from "./src/middleware/errorMiddleware";
import { initializeSocketIo, getIo } from "./src/utils/socket";
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
const server = http.createServer(app);
initializeSocketIo(server);
const io = getIo();

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
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
