const express = require("express");
const router = express.Router();
const { findUser } = require("../middleware/index.js");
const lodash = require("lodash");

router.param("userId", findUser);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { addresses } = req.user;
            res.status(200).json({ success: true, addresses });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving addresses.", error: error.message })
        }
    })

    .post(async (req, res) => {
        try {
            const { user } = req;
            const address = req.body;
            user.addresses.push(address);
            const { addresses } = await user.save();
            res.status(200).json({ success: true, address: addresses[addresses.length - 1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding address into addresses.", error: error.message })
        }
    })

router.route("/:userId/:addressId")
    .put(async (req, res) => {
        try {
            const { user } = req;
            const { addressId } = req.params;
            const updateAddress = req.body;

            const address = await user.addresses.find(address => address._id.toString() === addressId);

            lodash.extend(address, updateAddress);
            await user.save();
            res.status(200).json({ success: true, address });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while updating the address in addresses.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user } = req;
            const { addressId } = req.params;
            const address = await user.addresses.find(address => address._id.toString() === addressId);
            user.addresses.remove(addressId);
            await user.save();
            res.status(200).json({ success: true, address });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing address from addresses.", error: error.message })
        }
    })

router.route("/selectAddress/:userId/:addressId")
    .post(async (req, res) => {
        try {
            const { user } = req;
            const { addressId } = req.params;
            user.selectedAddress = addressId;
            const { selectedAddress } = await user.save();
            res.status(200).json({ success: true, selectedAddress });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while selecting address from addresses.", error: error.message })
        }
    })

module.exports = router;