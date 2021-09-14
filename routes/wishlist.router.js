const express = require("express");
const router = express.Router();
const { findProduct, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("productId", findProduct);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { wishlist } = await user.populate('wishlist');
            res.status(200).json({ success: true, wishlist });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving wishlist.", error: error.message })
        }
    })

router.route("/:userId/:productId")
    .post(async (req, res) => {
        try {
            const { user, product } = req;
            user.wishlist.push(product._id);
            await user.save();
            const { wishlist } = await user.populate('wishlist');
            res.status(200).json({ success: true, product: wishlist[wishlist.length-1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding product into wishlist.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, product } = req;
            user.wishlist.remove(product._id);
            const { wishlist } = await user.save();
            res.status(200).json({ success: true, product: product._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing product from wishlist.", error: error.message })
        }
    })

module.exports = router;