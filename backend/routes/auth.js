const router = require("express").Router();
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

// REGISTER
router.post("/register", authController.registerUser)

// LOGIN
router.post("/login", authController.loginUser)

// LOGOUT
router.post("/logout", middlewareController.verifyToken, authController.logoutUser)

module.exports = router;