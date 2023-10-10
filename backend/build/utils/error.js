"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
var handleError = function (statusCode, message) {
    var error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
exports.handleError = handleError;
