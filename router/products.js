const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsPageList, getEditProduct, getAddProduct,
    postAddProduct, putEditProduct } = require('../controllers/productController');
const { uploadProductImage } = require('../middleware/uploadImage');

router.route('/')
    .get(getProductsPageList)

router.route('/edit/:_id')
    .get(getEditProduct)
    .put(putEditProduct)

router.route('/create')
    .get(getAddProduct)
    .post(uploadProductImage.single('prd_image'), postAddProduct)
    
module.exports = router;