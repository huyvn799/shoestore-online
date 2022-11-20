const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const productController = require("../controllers/productController");

// CREATE PRODUCT
router.post("/", middlewareController.verifyTokenOnlyAdmin, productController.addProduct);

// UPDATE PRODUCT
router.put("/:id", middlewareController.verifyTokenOnlyAdmin, productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", middlewareController.verifyTokenOnlyAdmin, productController.deleteProduct);

// GET PRODUCT INFO
// router.get("/:id", middlewareController.verifyTokenAndAdminAuth, productController.getProduct);
router.get("/:id", productController.getProduct);

// GET ALL PRODUCTS
// router.get("/", middlewareController.verifyTokenAndAdminAuth, productController.getAllProducts);
router.get("/", productController.getAllProducts);


module.exports = router;