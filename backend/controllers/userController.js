const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userController = {
    // UPDATE USER INFO
    updateUser: async (req, res) => {
        // nếu gửi mật khẩu thì mã hóa nó
        // (vừa để bảo mật vừa lưu lại dạng mã hóa vào DB)
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SECRET
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    // cập nhật thông tin mới từ req.body
                    $set: req.body,
                },
                { new: true } // lưu lại những cập nhật mới
            );

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE USER
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET USER INFO
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            // await User.findOne({_id: req.user.id});

            const { password, ...others } = user._doc;

            res.status(200).json(others);
            // res.status(200).json(`Get user with ${req.params.id} successfully!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            // query trả về 5 users mới nhất.
            const query = req.query.new;

            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET USER STATS
    // thống kế bao nhiêu user trong 1 tháng từ hiện tại lùi về 1 năm
    getUserStats: async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gt: lastYear } } },
                { 
                    $project: { 
                        // lấy ra tháng từ createdAt và gán cho month
                        // vd: $year: "$createdAt" sẽ lấy ra year
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: ["$year", "$month"], //$month là biến month của $project
                        // month: "$year",
                        total: { $sum: 1 }
                    }
                }
            ]);
            


            res.status(200).json(data);

        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
