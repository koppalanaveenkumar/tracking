"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    itemtype: {
        type: mongoose_1.Schema.Types.String,
        required: 'Item is required',
    },
    itemname: {
        type: mongoose_1.Schema.Types.String,
        required: 'Item Name is required'
    },
    itemvalue: {
        type: mongoose_1.Schema.Types.String,
        required: 'Item Value is required'
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: new Date()
    }
});
exports.default = (0, mongoose_1.model)('item', itemSchema);
