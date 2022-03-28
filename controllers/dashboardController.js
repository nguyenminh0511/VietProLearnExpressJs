const UserModel = require('../models/users');
const ProductModel = require('../models/products');
const path = require('path');

const count = async (req, res, next) => {
    try {
        let users = UserModel.countDocuments();
        let products = ProductModel.countDocuments();
        let countUser = await users;
        let countProduct = await products;
        res.render(path.join(__dirname, '../views/admin/dashboard.ejs'), {
            totalUsers: countUser,
            totalProducts: countProduct
        })
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

module.exports = {
    count
}