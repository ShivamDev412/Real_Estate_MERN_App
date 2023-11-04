import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import {
  createListing,
  getListingById,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";
const route = express.Router();

route.get(ENDPOINTS.GET_LISTING, verifyToken, getListingById);
route.post(ENDPOINTS.CREATE_LISTING, verifyToken, createListing);
route.delete(ENDPOINTS.DELETE_LISTING, verifyToken, deleteListing);
route.put(ENDPOINTS.UPDATE_LISTING, verifyToken, updateListing);
route.get(ENDPOINTS.ALL_LISTINGS, verifyToken, getListingById);
export default route;
