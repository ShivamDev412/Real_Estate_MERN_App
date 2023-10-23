"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = exports.signIn = exports.signup = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = __importDefault(require("../database/models/user.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var error_1 = require("../utils/error");
var signup = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, existingUser, existingEmail, salt, hashedPassword, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, username = _a.username, password = _a.password, email = _a.email;
                return [4 /*yield*/, user_model_1.default.findOne({ username: username })];
            case 1:
                existingUser = _b.sent();
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 2:
                existingEmail = _b.sent();
                if (existingUser) {
                    next({
                        status: 500,
                        message: "User with that username already exists",
                    });
                }
                if (existingEmail) {
                    next({
                        status: 500,
                        message: "User with that email already exists",
                    });
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                hashedPassword = bcrypt_1.default.hashSync(password, salt);
                newUser = new user_model_1.default({ username: username, password: hashedPassword, email: email });
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, newUser.save()];
            case 5:
                _b.sent();
                response.status(201).json({
                    success: true,
                    message: "User created successfully",
                    data: {
                        user: {
                            email: newUser.email,
                            username: newUser.username,
                            avatar: newUser.avatar,
                            id: newUser._id,
                        },
                    },
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var signIn = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, validPassword, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser)
                    next((0, error_1.handleError)(500, "User with that email does not exist"));
                else {
                    validPassword = bcrypt_1.default.compareSync(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
                    if (!validPassword)
                        next((0, error_1.handleError)(500, "Invalid password"));
                    else {
                        token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET);
                        response
                            // .cookie("access-token", token, { httpOnly: true })
                            .status(200)
                            .json({
                            success: true,
                            message: "User logged in successfully",
                            data: {
                                user: {
                                    email: existingUser.email,
                                    username: existingUser.username,
                                    avatar: existingUser.avatar,
                                    id: existingUser._id,
                                },
                                token: token,
                            },
                        });
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var googleSignIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, name, image, user, token, _b, password, rest, newPassword, salt, hashedPassword, newUser, token, _c, pass, rest, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, name = _a.name, image = _a.image;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 8]);
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 2:
                user = _d.sent();
                if (!user) return [3 /*break*/, 3];
                console.log("if");
                token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
                _b = user._doc, password = _b.password, rest = __rest(_b, ["password"]);
                res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    data: {
                        user: {
                            avatar: rest.avatar,
                            email: rest.email,
                            username: rest.username,
                            id: rest._id,
                        },
                        token: token,
                    },
                });
                return [3 /*break*/, 6];
            case 3:
                newPassword = Math.random().toString(36).slice(-8) +
                    Math.random().toString(36).slice(-8);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 4:
                salt = _d.sent();
                hashedPassword = bcrypt_1.default.hashSync(newPassword, salt);
                newUser = new user_model_1.default({
                    email: email,
                    username: name.split(" ").join("").toLowerCase() +
                        Math.random().toString(36).slice(-4),
                    password: hashedPassword,
                    avatar: image,
                });
                return [4 /*yield*/, newUser.save()];
            case 5:
                _d.sent();
                if (newUser) {
                    token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
                    _c = newUser._doc, pass = _c.password, rest = __rest(_c, ["password"]);
                    res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        data: {
                            user: {
                                avatar: rest.avatar,
                                email: rest.email,
                                username: rest.username,
                                id: rest._id,
                            },
                            token: token,
                        },
                    });
                }
                else {
                    next((0, error_1.handleError)(500, "Something went wrong"));
                }
                _d.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _d.sent();
                next(error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.googleSignIn = googleSignIn;
