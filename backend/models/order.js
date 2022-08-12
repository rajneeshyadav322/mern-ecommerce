const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentId:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    products:[{
        name: {type: String},
        images: {type: Array},
        amount: {type: Number},
        quantity: {type: Number},
    }],
    total: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: "Pending"
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Order", orderSchema)