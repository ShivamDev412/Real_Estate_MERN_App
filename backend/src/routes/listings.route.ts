import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import {
  getAllListings,
  getListingById,
} from "../controllers/listings.controller";
import {
  addReview,
} from "../controllers/review.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.get(ENDPOINTS.ALL_LISTINGS, verifyToken, getAllListings);
route.get(ENDPOINTS.LISTING_DETAIL, verifyToken, getListingById);
route.post(ENDPOINTS.ADD_LISTING_REVIEWS, verifyToken, addReview);

export default route;
