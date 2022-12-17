const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const orderController = require("../controllers/orderController");


// GET INCOME IN 2 LATEST MONTH
router.get("/income/latest", middlewareController.verifyTokenOnlyAdmin, orderController.getOrdersIncome);

// GET MONTHLY INCOME IN YEAR
router.get("/income/year", middlewareController.verifyTokenOnlyAdmin, orderController.getIncomeInYear);

// CREATE ORDER
router.post("/", middlewareController.verifyToken, orderController.addOrder);

// UPDATE ORDER
router.put("/:id", middlewareController.verifyTokenOnlyAdmin, orderController.updateOrder);

// DELETE ORDER
router.delete("/:id", middlewareController.verifyTokenOnlyAdmin, orderController.deleteOrder);

// GET ORDER INFO
router.get("/:id", middlewareController.verifyTokenAndAdminAuth, orderController.getUserOrders);

// GET ALL ORDERS
router.get("/", middlewareController.verifyTokenOnlyAdmin, orderController.getAllOrders);

module.exports = router;