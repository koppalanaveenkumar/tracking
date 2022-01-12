"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String,
        required: 'User is required',
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: 'Email is required'
    },
    phone: {
        type: mongoose_1.Schema.Types.String,
        required: 'Phone number is required'
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: 'Password is required'
    },
    lastLoggedIn: {
        type: mongoose_1.Schema.Types.String,
    },
    resetPasswordToken: {
        type: mongoose_1.Schema.Types.String
    },
    resetPasswordExpires: {
        type: mongoose_1.Schema.Types.String
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: new Date()
    },
    isUser: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true
    },
    isActive: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true
    },
    lastUpdatedAt: {
        type: mongoose_1.Schema.Types.Number,
        default: (0, moment_1.default)().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
});
exports.default = (0, mongoose_1.model)('admin', adminSchema);
