const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: String,
    name: String,
    price: String,
    material: String,
    type: String,
    pattern: String,
    color: String,
    description: String,
    inStock: Boolean,
    freeDelivery: Boolean,
    discount: Number
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;