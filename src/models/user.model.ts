import moment from "moment";
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    locality: {
        type: Schema.Types.String,
        required: 'Locality is required',
    },
    address: {
        type: Schema.Types.String,
        required: 'Address is required',
    },
    landmark: {
        type: Schema.Types.String
    },
    city: {
        type: Schema.Types.String,
        required: 'City is required',
    },
    state: {
        type: Schema.Types.String,
        required: 'State is required',
    },
    pincode: {
        type: Schema.Types.Number,
        required: 'First name is required',
    }
});

const userSchema = new Schema({
    firstname: {
        type: Schema.Types.String,
        required: 'First name is required',
    },
    lastname: {
        type: Schema.Types.String,
        required: 'Last name is required',
    },
    email: {
        type: Schema.Types.String,
        required: 'Email is required'
    },
    phone: {
        type: Schema.Types.String,
        required: 'Phone number is required'
    },
    address: [addressSchema],
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    },
    lastUpdatedAt: {
        type: Schema.Types.String,
        default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
});

export default model('user', userSchema);