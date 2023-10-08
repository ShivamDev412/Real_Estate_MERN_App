import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import { signup, signIn, googleSignIn } from "../controllers/auth.controller";
const route = express.Router();

route.post(ENDPOINTS.SIGNUP, signup);
route.post(ENDPOINTS.LOGIN, signIn);
route.post(ENDPOINTS.GOOGLE, googleSignIn);

export default route;
