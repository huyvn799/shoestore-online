const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {
    // ADD ORDER
    addOrder: async (req, res) => {

        const newOrder = new Order(req.body);

        const updateStock = async(product) => {
            console.log(product);

            try {
                // id có dạng [product]#[size]
                const currentProduct = await Product.findById(product._id.split('#')[0]);

                const updatedProduct = await Product.findByIdAndUpdate(
                    currentProduct._id,
                    {
                        [product.size]: currentProduct[product.size] - 1,                        
                    },
                    { new: true } // trả về object đã updated mới
                );
                    
            } catch (err) {
                console.log(err);
            }
        }

        newOrder.products.forEach((product) => {
            updateStock(product);
        });
                
        try {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // UPDATE ORDER
    updateOrder: async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    // cập nhật thông tin mới từ req.body
                    $set: req.body,
                },
                { new: true } // trả về object đã updated mới
            );

            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE ORDER
    deleteOrder: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Order has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET USER ORDERS
    getUserOrders: async (req, res) => {
        try {
            // mỗi user chỉ có 1 orders
            const orders = await Order.find({ userId: req.params.id});

            res.status(200).json(orders);
            // res.status(200).json(`Get orders with ${req.params.userId} successfully!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL ORDERS of ALL USERs
    getAllOrders: async (req, res) => {
        try {
            // query trả về 5 users mới nhất.
            const query = req.query.new;

            const orders = query
                ? await Order.find().sort({ createdAt: -1 }).limit(5)
                : await Order.find();

            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET MONTHLY INCOME
    getOrdersIncome: async (req, res) => {
        try { 
            //? date: t9 -> lastMonth: t8 -> previousMonth: t7
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth }}},
                { 
                    $project: { 
                        month: { $month: "$createdAt"},
                        year: { $year: "$createdAt"},
                        sales: "$amount",
                    }
                },
                { 
                    $group: { 
                        _id: "$month",
                        _id: ["$month", "$year"],
                        total: { $sum: "$sales"}
                    }   
                }
            ]);

            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = orderController;

