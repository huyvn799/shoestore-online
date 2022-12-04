const Wishlist = require("../models/Wishlist");

const wishlistController = {
    // ADD Wishlist
    addWishlist: async (req, res) => {

        const newWishlist = new Wishlist(req.body);

        try {
            const savedWishlist = await newWishlist.save();
            res.status(200).json(savedWishlist);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // UPDATE Wishlist
    updateWishlist: async (req, res) => {
        try {
            const updatedWishlist = await Wishlist.findByIdAndUpdate(
                req.params.id,
                {
                    // cập nhật thông tin mới từ req.body
                    $set: req.body,
                },
                { new: true } // trả về object đã updated mới
            );

            res.status(200).json(updatedWishlist);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE Wishlist
    deleteWishlist: async (req, res) => {
        try {
            await Wishlist.findByIdAndDelete(req.params.id);
            res.status(200).json("Wishlist has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET USER Wishlist
    getUserWishlist: async (req, res) => {
        try {
            // mỗi user chỉ có 1 Wishlist
            const wishlist = await Wishlist.find({ userId: req.params.userId});

            res.status(200).json(wishlist._doc);
            // res.status(200).json(`Get Wishlist with ${req.params.id} successfully!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL WishlistS of ALL USERs
    getAllWishlists: async (req, res) => {
        try {
            // query trả về 5 users mới nhất.
            const query = req.query.new;

            const wishlists = query
                ? await Wishlist.find().sort({ createdAt: -1 }).limit(5)
                : await Wishlist.find();

            res.status(200).json(wishlists);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = wishlistController;

