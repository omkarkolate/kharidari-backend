const express = require("express");
const router = express.Router();
const { Product } = require("../models/index.js");
const { findProduct } = require("../middleware/index.js");

router.param("productId", findProduct);

router.route("/")
    .get(async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json({ success: true, products })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving products.", error: error.message })
        }
    })

    .post(async (req, res) => {
        try {
            const product = req.body;
            const NewProduct = new Product(product);
            const savedProduct = await NewProduct.save();
            res.status(200).json({ success: true, product: savedProduct });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while saving the product.", error: error.message })
        }
    })

router.route('/:productId')
    .get((req, res) => {
        const product = req.product;
        res.status(200).json({ success: true, product });
    })

    .put(async (req, res) => {
        try {
            const product = req.product;
            const updateProduct = req.body;

            lodash.extend(product, updateProduct);
            const savedProduct = await product.save();
            savedProduct.password = undefined;
            res.status(200).json({ success: true, product: savedProduct });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while updating the product.", error: error.message })
        }
    })


module.exports = router;