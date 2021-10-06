const express = require("express");
const router = express.Router();
const { findUser } = require("../middleware/index.js");
const lodash = require("lodash");

router.param("userId", findUser);

router.route("/:userId")
    .get(async (req, res) => {
        let user = req.user;
        user = await user.populate(['cart.product', 'wishlist']); 
        res.status(200).json({ success: true, user });
    })

    .put(async (req, res) => {
        try {
            const user = req.user;
            const updateUser = req.body;

            lodash.extend(user, updateUser);
            const savedUser = await user.save();
            savedUser.createdAt = undefined;
            savedUser.updatedAt = undefined;
            savedUser.__v = undefined;
            res.status(200).json({ success: true, user: savedUser });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while updating the user.", error: error.message })
        }
    })

router.route("/change-password/:userId")
    .put(async (req, res) => {
        try{
            const user = req.user;
            const {oldPassword, newPassword} = req.body;

            if(user.password === oldPassword) {
                user.password = newPassword;
                await user.save();
                res.status(200).json({ success: true, message: "Password Changed Succesfully" });
            } else {
                throw new Error("Old password is not matched.")
            }
        } catch(error) {
            res.status(500).json({ success: false, message: "Error while changing the password.", error: error.message })
        }
    })

module.exports = router;
