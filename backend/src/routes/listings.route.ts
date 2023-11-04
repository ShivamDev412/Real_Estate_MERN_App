import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import { getAllListings } from "../controllers/listings.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.get(ENDPOINTS.ALL_LISTINGS, verifyToken, getAllListings);

export default route;