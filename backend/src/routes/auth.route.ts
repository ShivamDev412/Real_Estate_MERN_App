import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import {
  signup,
  signIn,
  googleSignIn,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller";
const route = express.Router();

route.post(ENDPOINTS.SIGNUP, signup);
route.post(ENDPOINTS.LOGIN, signIn);
route.post(ENDPOINTS.FORGOT_PASSWORD, forgotPassword);
route.post(ENDPOINTS.RESET_PASSWORD, resetPassword);
route.post(ENDPOINTS.GOOGLE, googleSignIn);

export default route;
