const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const cartController = require("../controllers/cartController");

// CREATE CART
// router.post("/", middlewareController.verifyToken, cartController.addCart);
router.post("/", cartController.addCart);

// UPDATE CART
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, cartController.updateCart);

// DELETE CART
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, cartController.deleteCart);

// GET CART INFO - id: là userId
router.get("/:id", middlewareController.verifyTokenAndAdminAuth, cartController.getUserCart);

// GET ALL CARTS
router.get("/", middlewareController.verifyTokenOnlyAdmin, cartController.getAllCarts);


module.exports = router;