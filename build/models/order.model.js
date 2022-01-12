"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customerid: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: 'CustomerId is required'
    },
    itemsid: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: 'ItemId is required'
        }],
    itemvalue: {
        type: mongoose_1.Schema.Types.String,
        required: 'Item Value is required'
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: "in progress..."
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: new Date()
    }
});
exports.default = (0, mongoose_1.model)('order', orderSchema);
