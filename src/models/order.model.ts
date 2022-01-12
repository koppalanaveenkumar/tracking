import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    customerid: {
        type: Schema.Types.ObjectId,
        required: 'CustomerId is required'
    },
    itemsid: [{
        type: Schema.Types.ObjectId,
        required: 'ItemId is required'
    }],
    itemvalue: {
        type: Schema.Types.String,
        required: 'Item Value is required'
    },
    status: {
        type: Schema.Types.Boolean,
        default: "in progress..."
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    }
});

export default model('order', orderSchema);