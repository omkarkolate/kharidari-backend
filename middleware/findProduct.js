const { Product } = require("../models/index.js");

async function findProduct(req, res, next, productId){
    try{
        const product = await Product.findById(productId);

        if(product) {
            req.product = product;
            next();
        } else {
            throw 'User not exist with this user id.';
        }
    } catch (error) {
        res.status(400).json({ success: false, messsage: "Error in retriving product.", error })
    }
} 

module.exports = findProduct;