const mongoose = require('mongoose');
const uri = process.env['dburi'];

async function initDatabaseConnection(){
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Successfully connected.")
    } catch (error) {
        console.error("mongoose connection failed", error.messsage)
    }

}

module.exports = initDatabaseConnection;