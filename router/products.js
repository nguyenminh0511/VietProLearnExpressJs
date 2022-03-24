const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsPageList, editProduct, getAddProduct,
    postAddProduct } = require('../controllers/productController');
const { uploadProductImage } = require('../middleware/uploadImage');

router.route('/')
    .get(getProductsPageList)

router.route('/edit/:id')
    .get(editProduct)

router.route('/create')
    .get(getAddProduct)
    .post(uploadProductImage.single('prd_image'), postAddProduct)
    
module.exports = router;