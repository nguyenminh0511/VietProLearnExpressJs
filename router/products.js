const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsPageList, editProduct, getAddProduct } = require('../controllers/productController');

router.route('/')
    .get(getProductsPageList)

router.route('/edit/:id')
    .get(editProduct)

router.route('/create')
    .get(getAddProduct)
    .post()
    
module.exports = router;