const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    customerId: { type: String },
    // products: [
    //     { 
    //         productId: { type: String },
    //         title: { type: String},
    //         img: { type: String},
    //         brand: { type: String},
    //         color: { type: String},
    //         size: {type: String},
    //         quantity: { type: Number },
    //         price: { type: Number},
    //     }
    // ], 
    products: { type: Array, required: true},
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount_amount: { type: Number, default: 0},
    shipping_info: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);