const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const wishlistController = require("../controllers/wishlistController");

// CREATE Wishlist
router.post("/", middlewareController.verifyToken, wishlistController.addWishlist);

// UPDATE Wishlist
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, wishlistController.updateWishlist);

// DELETE Wishlist
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, wishlistController.deleteWishlist);

// GET Wishlist INFO
router.get("/:userId", middlewareController.verifyTokenAndAdminAuth, wishlistController.getUserWishlist);

// GET ALL WishlistS
router.get("/", middlewareController.verifyTokenOnlyAdmin, wishlistController.getAllWishlists);


module.exports = router;