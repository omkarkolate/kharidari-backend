const wishlist = require("./wishlist.router.js");
const login = require("./login.router.js");
const signup = require("./signup.router.js");
const product = require("./product.router.js");
const user = require("./user.router.js");
const cart = require("./cart.router.js");
const address = require("./address.router.js");
const order = require("./order.router.js");


module.exports = { login, signup, user, product, wishlist, cart, address, order };