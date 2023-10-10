"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_1 = require("../utils/endpoints");
var user_controller_1 = require("../controllers/user.controller");
var route = express_1.default.Router();
route.get("/", function (req, res) { });
route.post(endpoints_1.ENDPOINTS.UPDATE_USER, user_controller_1.updateUserProfile);
exports.default = route;
