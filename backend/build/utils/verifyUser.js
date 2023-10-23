"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var error_1 = require("./error");
var verifyToken = function (request, response, next) {
    var token = request.cookies["access-token"];
    if (!token)
        return next((0, error_1.handleError)(401, "No token provided"));
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err)
            return next((0, error_1.handleError)(401, "Invalid token"));
        //@ts-ignore
        request.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
