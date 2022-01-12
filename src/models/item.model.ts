import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    itemtype: {
        type: Schema.Types.String,
        required: 'Item is required',
    },
    itemname: {
        type: Schema.Types.String,
        required: 'Item Name is required'
    },
    itemvalue: {
        type: Schema.Types.String,
        required: 'Item Value is required'
    },
    itemid: {
        type: Schema.Types.String,
        required: 'Itemid is required'
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    }
});


export default model('item', itemSchema);