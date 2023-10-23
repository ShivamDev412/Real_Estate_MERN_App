"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ListingSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        require: true,
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    rent: {
        type: Boolean,
        required: true,
    },
    sale: {
        type: Boolean,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrl: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Listing = mongoose_1.default.model("Listing", ListingSchema);
exports.default = Listing;
