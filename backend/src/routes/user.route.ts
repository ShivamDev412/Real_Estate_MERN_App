import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import { updateUserProfile, deleteUser, showUserListings } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.post(ENDPOINTS.UPDATE_USER, verifyToken, updateUserProfile);
route.delete(ENDPOINTS.DELETE_USER, verifyToken, deleteUser);
route.get(ENDPOINTS.GET_USER_LISTING, verifyToken, showUserListings);
export default route;
