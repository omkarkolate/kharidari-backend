const express = require("express");
const router = express.Router();
const { findProduct, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("productId", findProduct);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { cart } = await user.populate('cart.product');
            res.status(200).json({ success: true, cart });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving cart.", error: error.message })
        }
    })

router.route("/:userId/:productId")
    .post(async (req, res) => {
        try {
            const { user, product } = req;
            user.cart.push({_id: product._id ,product: product._id });
            await user.save();
            const { cart } = await user.populate('cart.product');
            res.status(200).json({ success: true, cartItem: cart[cart.length - 1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding product into cart.", error: error.message })
        }
    })

    .put(async (req, res) => {
        try {
            const { user } = req;
            const { productId } = req.params;
            const { quantity } = req.body;
            
            const cartItem = await user.cart.find(cartItem => cartItem._id.toString() === productId);
            cartItem.quantity = quantity;  
            await user.save();
            res.status(200).json({ success: true, cartItem  });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while updating the item in cart.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, product } = req;           
            user.cart.remove(product._id);
            const { cart } = await user.save();
            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing product from cart.", error: error.message })
        }
    })

module.exports = router;
