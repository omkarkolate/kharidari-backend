const express = require("express");
const router = express.Router();
const { findProduct, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("productId", findProduct);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { orders } = await user.populate('orders.product');
            res.status(200).json({ success: true, orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving orders.", error: error.message })
        }
    })

    .post(async (req, res) => {
        try {
            const { user } = req;
            const order = req.body;
            user.orders.push(order);
            user.cart.remove(order.product);
            const { orders } = await user.save();
            res.status(200).json({ success: true, order: orders[orders.length - 1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding order into orders.", error: error.message })
        }
    })

router.route("/:userId/:orderId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { orderId } = req.params;
            const { orders } = await user.populate('orders.product');
            const order = await orders.find(order => order._id.toString() === orderId);
            res.status(200).json({ success: true, order });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving orders.", error: error.message })
        }
    })

router.route("/multiple/:userId")
    .post(async (req, res) => {
        try {
            const { user } = req;
            const { newOrders } = req.body;
            user.orders = [ ...user.orders, ...newOrders ];
            user.cart = [];
            const { orders } = await user.save();
            res.status(200).json({ success: true, orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding orders.", error: error.message })
        }
    })

module.exports = router;