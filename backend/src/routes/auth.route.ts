import express from "express";
import {ENDPOINTS} from "../utils/endpoints";
import { signup } from "../controllers/auth.controller";
const route = express.Router();

route.post(ENDPOINTS.SIGNUP, signup);

export default route;
