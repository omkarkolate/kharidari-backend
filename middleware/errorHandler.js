function errorHandler (err, req, res, next) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error occured, see the errMessage key for the details", errmessage: err.message })
}

module.exports = errorHandler;