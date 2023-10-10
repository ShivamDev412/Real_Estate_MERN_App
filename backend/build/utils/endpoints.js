"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APITYPE = exports.ENDPOINTS = void 0;
var ENDPOINTS = {
    LOGIN: "/signin",
    LOGOUT: "/logout",
    SIGNUP: "/signup",
    GOOGLE: "/google",
    UPDATE_USER: "update-user/:id",
};
exports.ENDPOINTS = ENDPOINTS;
var APITYPE = {
    USER: "/api/user",
    AUTH: "/api/auth",
};
exports.APITYPE = APITYPE;
