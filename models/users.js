const mongoose = require('./index.js');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    full_name: String,
    cart: {
        type: mongoose.Types.ObjectId,
        ref: 'carts'
    }
}, {
    collection: 'users'
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;