const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const productController = require("../controllers/productController");

// CREATE PRODUCT
router.post("/", middlewareController.verifyTokenOnlyAdmin, productController.createProduct);

module.exports = router;