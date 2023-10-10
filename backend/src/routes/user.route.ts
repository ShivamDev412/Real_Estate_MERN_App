import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import { updateUserProfile } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.get("/", (req, res) => {});
route.post(ENDPOINTS.UPDATE_USER, verifyToken, updateUserProfile);
export default route;
