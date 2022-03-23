const ProductModel = require('../models/products');
const path = require('path');
const paginate = require('../common/paginate');
const PAGE_SIZE = 5;

const getAllProducts = async (req, res, next) => {
    try {
        let data = await ProductModel.find();
        if (data.length > 0) {
            res.render(path.join(__dirname, '../views/product.ejs'), 
            {
                products: data,
                page:1,
                pages: 3,
                totalPage: 5
            });
        } else {
            res.json('No product data found!');
        }
    } catch(err) {
        res.status(500).json('Server error!');
    }
}

const getProductsPageList = async (req, res, next) => {
    try {
        let page = req.query.page;
        let start = parseInt(page);
        if (start < 1) {
            start = 1;
        }
        let data = ProductModel.find().skip(PAGE_SIZE * (start - 1)).limit(PAGE_SIZE);
        let countDocuments = ProductModel.countDocuments();
        let getProducts = await data;
        let total = await countDocuments;
        if (getProducts.length > 0) {
            res.render(path.join(__dirname, '../views/product.ejs'), {
                products: getProducts,
                page: start,
                pages: paginate(start, total),
                totalPage: Math.ceil(parseInt(total) / PAGE_SIZE)
            })
        } else {
            res.json("No product data found!");
        }
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

module.exports = {
    getAllProducts,
    getProductsPageList
}