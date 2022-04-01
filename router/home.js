const express = require("express");
const router = express.Router();
const { getHomePage, getByCategory, getProduct, addComment, searchResult } = require('../controllers/siteController');
const { getCart, addtoCart, updateCart, order, success } = require('../controllers/cartController');
const { route } = require("express/lib/application");

router.route('/home')
    .get(getHomePage)

router.route('/category/:id')
    .get(getByCategory)

router.route('/product/:id')
    .get(getProduct)
    .post(addComment)

router.route('/search')
    .get(searchResult)

router.route('/cart')
    .get(getCart)
    .post(addtoCart)
    .put(updateCart)

router.route('/order')
    .post(order)
    .get(success)

module.exports = router;