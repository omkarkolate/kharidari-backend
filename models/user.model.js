const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
    name: { type: String, required: true },
    mobileNumber: { type: String },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    house: { type: String, required: true },
    areaAndRoad: { type: String, required: true },
});

const cartItemSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    product: {
        type: Schema.Types.ObjectId, 
        ref: 'product'
    }, 
    quantity: {type: Number, default: 1 } 
}, { _id: false });

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: { type: Number, required: true },
    address: { type:addressSchema, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    deliveryCharges: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [cartItemSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    orders: [orderSchema],
    addresses: [addressSchema],
    selectedAddress: String
}, { timestamps: true });

const User = model('user', userSchema);

module.exports = User;


