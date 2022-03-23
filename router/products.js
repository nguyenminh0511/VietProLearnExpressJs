const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsPageList } = require('../controllers/productController');

router.route('/')
    .get(getProductsPageList);

router.route('/edit/:id')
    .get((req, res, next) => {
        res.json('edit');
    })
    
module.exports = router;