"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_1 = require("../utils/endpoints");
var user_controller_1 = require("../controllers/user.controller");
var verifyUser_1 = require("../utils/verifyUser");
var route = express_1.default.Router();
route.post(endpoints_1.ENDPOINTS.UPDATE_USER, verifyUser_1.verifyToken, user_controller_1.updateUserProfile);
route.delete(endpoints_1.ENDPOINTS.DELETE_USER, verifyUser_1.verifyToken, user_controller_1.deleteUser);
route.get(endpoints_1.ENDPOINTS.GET_USER_LISTING, verifyUser_1.verifyToken, user_controller_1.showUserListings);
exports.default = route;
