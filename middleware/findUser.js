const { User } = require("../models/index.js");

async function findUser(req, res, next, userId){
    try{
        const user = await User.findById(userId);
        
        if( user ) {
            req.user = user;
            next();
        } else {
            throw 'User not exist with this user id.';
        }
    } catch (error) {      
        res.status(400).json({ success: false, messsage: "Error in retriving user.", error })
    }
} 

module.exports = findUser;