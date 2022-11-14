const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const authController = {
    // REGISTER
    registerUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
        });
    
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        } catch (err) {
            res.status(500).json(err);
        }
    
    },
    
    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            // nếu ko có user
            if (!user) {
                return res.status(404).json("Wrong username!");
            }
    
            // có user
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
            const validPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            if (req.body.password !== validPassword) {
                return res.status(404).json("Wrong password!");
            }
    
            // Khi sign token thì token sẽ được tự động thêm vào header
            // dưới dạng "Bear [token]"
            const accessToken = jwt.sign({ 
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, process.env.JWT_SECRET, 
                {
                    expiresIn: "1d"    
                }
            );
    
            const {password, ...userNoPass} = user._doc;
            res.status(200).json({...userNoPass, accessToken});
    
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = authController;