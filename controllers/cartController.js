const CartModel = require('../models/cart');
const CategoryModel = require('../models/categories');
const path = require("path");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

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

const order = async (req, res, next) => {
    try {
        let shopMail = process.env.EMAIL;
        let destMail = req.body.mail;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: shopMail,
                pass: process.env.PASS
            }
        });

        let cart = CartModel.findOne({
            userId: req.userId
        }). populate('products.prdId');

        let cartData = await cart;

        let products = [];
        for (let product of cartData.products) {
            let temp = product.prdId;
            temp.qty = product.number;
            temp.description = "";
            products.push(temp);
        }

        const html = await ejs.renderFile(
            path.join(__dirname, "../views/site/email-order.ejs"),
            {
                name: req.body.name,
                phone: req.body.phone,
                mail: req.body.mail,
                add: req.body.add,
                // url: config.get("app.url"),
                totalPrice: 0,
                items: products
            }
        );

        await transporter.sendMail({
            from: shopMail,
            to: destMail,
            subject: "VERIFY ORDER",
            html
        })
        
        res.redirect(req.path);
    } catch(err) {
        console.log(err);
        res.status(500).json("Server error!");
    }
}

const success = async (req, res) => {
    let categories = await CategoryModel.find();
    res.render(path(__dirname, '../views/site/success.ejs'), {
        categories: categories
    });
}

module.exports = {
    getCart,
    addtoCart,
    updateCart,
    order,
    success
}