const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const middlewareController = {
    // verifyToken: xác nhận user
    verifyToken: async (req, res, next) => {
        const authTokenHeader = req.headers.token;
        if (authTokenHeader) {
            // phần header có token thường có dạng "Bearer [token]"
            // nên phải tách ra để lấy token
            const accessToken = authTokenHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => { 
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                // gán lại user của request là user lấy từ JWT
                // có sắn req.body, req.headers, tự thêm req.user
                req.user = user;

                // console.log("HELLO MOTHER");

                next();
            });
        } else {
            return res.status(401).json("You are not authenticated!")
        }
    },
    
    // verify token và xác thực chính mình hoặc admin để CRUD
    verifyTokenAndAdminAuth: async (req, res, next) => {
        
        middlewareController.verifyToken(req, res, () => {
            //? req.params.id lấy từ route xuống /:id
            if (req.user.id === req.params.id || req.user.isAdmin) {
                
                // console.log(true);
                next(); // của hàm verifyTokenAndAdminAuth   
            } else {
               return res.status(403).json("You're not allowed to do that!") 
            }
        });
    },

    // chỉ dành cho admin
    verifyTokenOnlyAdmin: async (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                
                // console.log(true);
                next(); // của hàm verifyTokenAndAdminAuth   
            } else {
               return res.status(403).json("You're not allowed to do that!") 
            }
        });
    }
}

module.exports = middlewareController;