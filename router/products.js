const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsPageList, getEditProduct, getAddProduct,
    postAddProduct, putEditProduct, deleteProduct } = require('../controllers/productController');
const { uploadProductImage } = require('../middleware/uploadImage');
const { checkAdmin } = require('../middleware/checkAdmin');

router.route('/')
    .get(getProductsPageList)

router.route('/edit/:_id')
    .get(getEditProduct)
    .post(putEditProduct) //use post instead of post because of ejs 

router.route('/create')
    .get(getAddProduct)
    .post(uploadProductImage.single('prd_image'), postAddProduct)

router.route('/delete/:_id')
    .delete(checkAdmin, deleteProduct)
    
module.exports = router;