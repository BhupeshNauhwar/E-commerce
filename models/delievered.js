const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    id:{
        type:String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    orderedProducts: [{
        url: {
            type: String
        },
        cprice: {
            type: Number
        },
        id: {
            type: String
        },
        dateshipping: {
            type: Date,
            default: () => new Date(Date.now() - (2 * 24 * 60 * 60 * 1000))
        },
        datedelivered: {
            type: Date,
            default: () => new Date(Date.now() + (2 * 24 * 60 * 60 * 1000))
        }
    }]
});

module.exports = mongoose.model("Delivery", deliverySchema);
