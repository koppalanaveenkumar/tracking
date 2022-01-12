"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = Object.freeze({
    MONGO_URL: "mongodb+srv://naveen:naveen@cluster0.tflnq.mongodb.net/tracking?retryWrites=true&w=majority",
    ADMIN_JWT_SECRET: 'trackingbackend',
    FRONT_END_URL: 'https://localhost:3000'
});
