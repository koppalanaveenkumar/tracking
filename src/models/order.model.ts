import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        required: 'CustomerId is required'
    },
    itemsId: {
        type: Array,
        required: 'itemsId is required'
    },
    itemvalue: {
        type: Schema.Types.String,
        required: 'Item Value is required'
    },
    orderid: {
        type: Schema.Types.String,
        required: 'Orderid is required'
    },
    status: {
        type: Schema.Types.String,
        default: "in progress..."
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    }
});

export default model('order', orderSchema);