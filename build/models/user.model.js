"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    locality: {
        type: mongoose_1.Schema.Types.String,
        required: 'Locality is required',
    },
    address: {
        type: mongoose_1.Schema.Types.String,
        required: 'Address is required',
    },
    landmark: {
        type: mongoose_1.Schema.Types.String
    },
    city: {
        type: mongoose_1.Schema.Types.String,
        required: 'City is required',
    },
    state: {
        type: mongoose_1.Schema.Types.String,
        required: 'State is required',
    },
    pincode: {
        type: mongoose_1.Schema.Types.Number,
        required: 'First name is required',
    }
});
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: mongoose_1.Schema.Types.String,
        required: 'First name is required',
    },
    lastname: {
        type: mongoose_1.Schema.Types.String,
        required: 'Last name is required',
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: 'Email is required'
    },
    phone: {
        type: mongoose_1.Schema.Types.String,
        required: 'Phone number is required'
    },
    address: [addressSchema],
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: new Date()
    },
    lastUpdatedAt: {
        type: mongoose_1.Schema.Types.String,
        default: (0, moment_1.default)().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
});
exports.default = (0, mongoose_1.model)('user', userSchema);
