"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var errorMiddleware = function (err, req, res, next) {
    var statusCode = err.statusCode || 500;
    var message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ success: false, statusCode: statusCode, message: message });
};
exports.errorMiddleware = errorMiddleware;
