const ProductModel = require('../models/products');
const path = require('path');
const paginate = require('../common/paginate');
const CategoryModel = require('../models/categories');
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
        let data = ProductModel.find().populate('cat_id').skip(PAGE_SIZE * (start - 1)).limit(PAGE_SIZE);
        let countDocuments = ProductModel.countDocuments();
        let getProducts = await data;
        // console.log(getProducts)
        let total = await countDocuments;
        let totalPage = Math.ceil(parseInt(total) / PAGE_SIZE);
        if (getProducts.length > 0) {
            res.render(path.join(__dirname, '../views/product.ejs'), {
                products: getProducts,
                page: start,
                pages: paginate(start, totalPage),
                totalPage: totalPage
            })
        } else {
            res.json("No product data found!");
        }
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

const editProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        let data = ProductModel.findById(productId);
        let categories = CategoryModel.find();
        let productData = await data;
        let categoryData = await categories;
        if (productData) {
            res.render('../views/edit_product.ejs', {
                product: productData,
                categories: categoryData
            })
        } else {
            res.json("Error! Can't find product data!");
        }
    } catch(err) {
        res.status(500).json("Server error!");
    }    
}

const getAddProduct = async (req, res, next) => {
    try {
        let categories = await CategoryModel.find();
        res.render('../views/add_product.ejs', {
            categories: categories
        })
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

const postAddProduct = async (req, res, next) => {
    try {
        let data = await ProductModel.create({
            thumbnail: 'products/' + req.file.originalname,
            description: req.body.prd_details,
            price: req.body.prd_price,
            cat_id: req.body.cat_id,
            status: req.body.prd_new,
            featured: req.body.prd_featured,
            promotion: req.body.prd_promotion,
            warrantly: req.body.prd_warranty,
            accessories: req.body.prd_accessories,
            is_stock: req.body.prd_status,
            name: req.body.prd_name,
            slug: "just a test"
        })
        if (data) {
            console.log(data);
            res.json("Create product successfully!");
        } else {
            res.json("Error! Can't create product");
        }
    } catch(err) {
        console.log(err);
        res.status(500).json('Server error!');
    }
}

module.exports = {
    getAllProducts,
    getProductsPageList,
    editProduct,
    getAddProduct,
    postAddProduct
}