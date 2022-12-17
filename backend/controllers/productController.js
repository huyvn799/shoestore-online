const Product = require("../models/Product");

const productController = {
    // ADD PRODUCT
    addProduct: async (req, res) => {

        const newProduct = new Product(req.body);

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // UPDATE PRODUCT
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    // cập nhật thông tin mới từ req.body
                    $set: req.body,
                },
                { new: true } // trả về object đã updated mới
            );

            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE PRODUCT
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("This product has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET PRODUCT INFO
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            // await Product.findOne({_id: req.product.id});

            res.status(200).json(product._doc);
            // res.status(200).json(`Get product with ${req.params.id} successfully!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL PRODUCTS
    getAllProducts: async (req, res) => {
        try {
            // query trả về 5 Products mới nhất.
            const qNew = req.query.new; //api/products?new=true
            const qCategory = req.query.category; //api/products?new=true&category=man

            let products;
            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5);
            } else if (qCategory) {
                products = await Product.find({ categories: { 
                    $in: [qCategory],
                }})
            } else {
                products = await Product.find();
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET ALL PRODUCTS IN SERIES
    getSeriesProducts: async (req, res) => {
        const product = await productController.getProduct();

        try {
            const qSeriesCode = product.seriesCode; //api/products?seriesCode=ABCXYZ

            const products = await Product.find({ seriesCode: { 
                $in: [qSeriesCode],
            }})

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = productController;

