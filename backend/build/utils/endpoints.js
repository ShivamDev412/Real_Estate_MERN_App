"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APITYPE = exports.ENDPOINTS = void 0;
var ENDPOINTS = {
    LOGIN: "/signin",
    LOGOUT: "/logout",
    SIGNUP: "/signup",
    GOOGLE: "/google",
    UPDATE_USER: "/update-user/:id",
    DELETE_USER: "/delete-user/:id",
    CREATE_LISTING: "/create-listing",
    GET_USER_LISTING: "/listings/:userId",
    GET_LISTING: "/:listingId",
    DELETE_LISTING: "/delete/:listingId",
    UPDATE_LISTING: "/update-listing/:listingId",
};
exports.ENDPOINTS = ENDPOINTS;
var APITYPE = {
    USER: "/api/user",
    AUTH: "/api/auth",
    LISTING: "/api/listing",
};
exports.APITYPE = APITYPE;
