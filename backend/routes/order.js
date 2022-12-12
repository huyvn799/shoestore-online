const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const orderController = require("../controllers/orderController");


// GET MONTHLY INCOME
router.get("/income", middlewareController.verifyTokenOnlyAdmin, orderController.getOrdersIncome);

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