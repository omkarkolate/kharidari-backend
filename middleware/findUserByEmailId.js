const { User } = require("../models/index.js");

async function findUserByEmailId(req, res, next) {
    try {
        const { emailId } = req.body;
        const path = req.path;
    
        const user = await User.findOne({ emailId });
        
        if (path === "/signup" && user){
            res.status(400).json({ success: false, message: "User is already registered with this email id, sign up with different email id."});
        } 
        else if (path === "/login" && !user) {
            res.status(400).json({ success: false, message: "User with this email dosen't present, please signup."});
        }
        else {
            req.user = user; 
            next();
        } 

    } catch (error){
        res.status(400).json({ success: false, message: "Error finding user", error: error.message });
    }
} 

module.exports = findUserByEmailId;