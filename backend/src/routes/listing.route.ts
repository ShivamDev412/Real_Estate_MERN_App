import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import { createListing } from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.post(ENDPOINTS.CREATE_LISTING, verifyToken ,createListing);

export default route;
