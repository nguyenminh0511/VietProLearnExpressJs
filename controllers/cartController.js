const CartModel = require('../models/cart');
const CategoryModel = require('../models/categories');
const path = require("path");

const getCart = async (req, res, next) => {

    let cart = CartModel.findOne({
        userId: req.userId
    }). populate('products.prdId');
    let categories = CategoryModel.find();

    let cartData = await cart;
    let categoryList = await categories;
    let products = []
    for (let product of cartData.products) {
        let temp = product.prdId;
        temp.qty = product.number;
        temp.description = "";
        products.push(temp);
    }

    res.render(path.join(__dirname, '../views/site/cart.ejs'), {
        categories: categoryList,
        totalPrice: 0,
        products: products
    })
}

const addtoCart = async (req, res, next) => {
    let productId = req.body.id;
    let number = parseInt(req.body.qty);
    let cartInfo = await CartModel.findOne({
        userId: req.userId
    }).populate('products.prdId');
    
    let productsInCart = cartInfo.products;
    let productCheck = productsInCart.filter(product => {
        return product.prdId._id == productId;
    })
    if (productCheck.length == 0) {
        let productAdd = {
            prdId: productId,
            number: number
        }
        await CartModel.updateOne({
            userId: req.userId
        }, {
            $push: { products: productAdd}
        })
    } else {
        let newNumber = productCheck[0].number + number;
        await CartModel.updateOne({
            userId: req.userId,
            "products.prdId": productId
        }, {
            $set: { "products.$.number": newNumber }
        })
    }
    
    res.redirect(req.path);
}

const updateCart = async (req, res, next) => {
    try {
        let cartInfoUpdate = JSON.parse(req.body.products);
        for (let product of cartInfoUpdate.data) {
            let newNumber = parseInt(product.number);
            if (newNumber != 0) {
                await CartModel.updateOne({
                    userId: req.userId,
                    "products.prdId": product.id
                }, {
                    $set: { "products.$.number": newNumber}
                })
            } else {
                await CartModel.updateOne({
                    userId: req.userId,
                }, {
                    $pull: { products : {
                        'prdId': product.id
                    }}
                })
            }
        }
        res.json("success");
    } catch(err) {
        console.log(err);
        res.status(500).json("Server error!");
    }
}

module.exports = {
    getCart,
    addtoCart,
    updateCart
}