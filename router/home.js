const express = require("express");
const router = express.Router();
const { getHomePage, getByCategory, getProduct, addComment, searchResult } = require('../controllers/siteController');

router.route('/home')
    .get(getHomePage)

router.route('/category/:id')
    .get(getByCategory)

router.route('/product/:id')
    .get(getProduct)
    .post(addComment)

router.route('/search')
    .get(searchResult)

module.exports = router;    