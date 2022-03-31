const mongoose = require('./index.js');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        prdId: {
            type: mongoose.Types.ObjectId,
            ref: 'products'
        },
        number: Number
    }]
})

const CartModel = mongoose.model('carts', cartSchema);
module.exports = CartModel