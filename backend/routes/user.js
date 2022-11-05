const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

// GET USER STATS
// thống kế bao nhiêu user trong 1 tháng từ hiện tại lùi về 1 năm
router.get("/stats", middlewareController.verifyTokenOnlyAdmin, userController.getUserStats);

// UPDATE USER
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, userController.updateUser);

// DELETE USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

// GET USER INFO
router.get("/:id", middlewareController.verifyTokenAndAdminAuth, userController.getUser);

// GET ALL USERS
router.get("/", middlewareController.verifyTokenOnlyAdmin, userController.getAllUsers);


module.exports = router;