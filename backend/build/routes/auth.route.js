"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_1 = require("../utils/endpoints");
var auth_controller_1 = require("../controllers/auth.controller");
var route = express_1.default.Router();
route.post(endpoints_1.ENDPOINTS.SIGNUP, auth_controller_1.signup);
route.post(endpoints_1.ENDPOINTS.LOGIN, auth_controller_1.signIn);
route.post(endpoints_1.ENDPOINTS.GOOGLE, auth_controller_1.googleSignIn);
exports.default = route;
