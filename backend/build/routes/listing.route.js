"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_1 = require("../utils/endpoints");
var listing_controller_1 = require("../controllers/listing.controller");
var verifyUser_1 = require("../utils/verifyUser");
var route = express_1.default.Router();
route.get(endpoints_1.ENDPOINTS.GET_LISTING, verifyUser_1.verifyToken, listing_controller_1.getListingById);
route.post(endpoints_1.ENDPOINTS.CREATE_LISTING, verifyUser_1.verifyToken, listing_controller_1.createListing);
route.delete(endpoints_1.ENDPOINTS.DELETE_LISTING, verifyUser_1.verifyToken, listing_controller_1.deleteListing);
route.put(endpoints_1.ENDPOINTS.UPDATE_LISTING, verifyUser_1.verifyToken, listing_controller_1.updateListing);
exports.default = route;
