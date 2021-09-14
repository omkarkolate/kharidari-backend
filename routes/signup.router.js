const express = require("express");
const router = express.Router();
const { User } = require("../models/index.js");

router.use(async (req, res) => {
        try {
            const user = req.body;
            const NewUser = new User(user);
            await NewUser.save();
            res.status(200).json({ success: true, message: "Successfully Signed up, now login." });
            
        } catch(error) {
            res.status(400).json({ success: false, message: "Error in adding user try again.", error: error.message });
        }
    })

module.exports = router;
