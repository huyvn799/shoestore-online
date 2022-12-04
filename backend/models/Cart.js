const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    products: { type: Array },
    quantity: { type: Number, default: 0},
    total: { type: Number, default: 0 } 
    // products: [
    //     { 
    //         productId: { 
    //             type: String
    //         },
    //         size: { 
    //             type: String
    //         },
    //         quantity: { 
    //             type: Number,
    //             default: 1 
    //         }
    //     }
    // ], 
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);