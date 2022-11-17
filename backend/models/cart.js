const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        // min: [1, "Quantity cannot be less than 1"]
    }
})


module.exports = mongoose.model("Cart", cartSchema)