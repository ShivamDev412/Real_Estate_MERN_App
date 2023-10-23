"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var database_1 = __importDefault(require("./database"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var listing_route_1 = __importDefault(require("./routes/listing.route"));
var endpoints_1 = require("./utils/endpoints");
var errorMiddleware_1 = require("./middleware/errorMiddleware");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4000;
(0, database_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(endpoints_1.APITYPE.USER, user_route_1.default);
app.use(endpoints_1.APITYPE.AUTH, auth_route_1.default);
app.use(endpoints_1.APITYPE.LISTING, listing_route_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
