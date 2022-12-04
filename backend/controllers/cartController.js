const Cart = require("../models/Cart");

const cartController = {
    // ADD CART
    addCart: async (req, res) => {

        const newCart = new Cart(req.body);

        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // UPDATE CART
    updateCart: async (req, res) => {
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { 
                    userId: req.params.id,
                },
                {
                    // cập nhật thông tin mới từ req.body
                    $set: req.body,
                },
                { new: true } // trả về object đã updated mới
            );

            res.status(200).json(updatedCart);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE CART
    deleteCart: async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET USER CART
    getUserCart: async (req, res) => {
        try {
            // mỗi user chỉ có 1 cart
            // const cart = await Cart.find({ userId: req.params.id});
            // console.log();
            const cart = await Cart.findOne({ userId: req.params.id})

            res.status(200).json(cart);
            // res.status(200).json(cart._doc);
            // res.status(200).json(`Get cart with ${req.params.id} successfully!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL CARTS of ALL USERs
    getAllCarts: async (req, res) => {
        try {
            // query trả về 5 users mới nhất.
            const query = req.query.new;

            const carts = query
                ? await Cart.find().sort({ createdAt: -1 }).limit(5)
                : await Cart.find();

            res.status(200).json(carts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = cartController;

