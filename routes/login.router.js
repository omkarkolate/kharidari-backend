const express = require("express");
const router = express.Router();

router.use(async (req, res) => {
        try {
            let user = req.user;
            const { password } = req.body;
            
            if (user.password === password ){
                user = await user.populate(['cart.product', 'wishlist']); 
                user.createdAt = undefined;
                user.updatedAt = undefined;
                user.__v = undefined;
                user.orders = undefined;
                res.status(200).json({ success: true, user});
            } 
            else {
                throw new Error("Wrong Password");
            }
            
        } catch(error) {
            res.status(400).json({ success: false, message: "Error in login user try again.", error: error.message });
        }  
    })

module.exports = router;