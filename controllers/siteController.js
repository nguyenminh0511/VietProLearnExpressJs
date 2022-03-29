const path = require("path");
const ProductModel = require('../models/products');
const CategoryModel = require('../models/categories');
const CommentModel = require('../models/comments');
const paginate = require('../common/paginate');
const PAGE_SIZE = 9;

const getHomePage = async (req, res, next) => {
    try {
        let featuredProducts = ProductModel.find({
            is_stock: true,
            featured: true
        }).limit(6);
    
        let lastestProducts = ProductModel.find({
            is_stock: true
        }).sort({_id: 1}).limit(6);
    
        let categories = CategoryModel.find({});
    
        let featuredList = await featuredProducts;
        let lastestList = await lastestProducts;
        let categoryList = await categories;
        res.render(path.join(__dirname, '../views/site/index.ejs'), {
            FeaturedProducts : featuredList,
            LatestProducts : lastestList,
            categories : categoryList
        })
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

const getByCategory = async(req, res, next) => {
    try {
        let id = req.params.id;
        let page = req.query.page;
        let start = parseInt(page);
        if (start < 1) {
            start = 1;
        }

        let countProduct = ProductModel.find({ cat_id: id }).countDocuments();
        let productData = ProductModel.find({ cat_id: id }).skip((start-1) * PAGE_SIZE).limit(PAGE_SIZE);
        let categories = CategoryModel.find();
        let category = CategoryModel.find({_id: id});
        let total = await countProduct;
        let products = await productData;
        let categoryList = await categories;
        let categoryData = await category;
        let categoryTitle = categoryData.title;
        let totalPage = Math.ceil(total / PAGE_SIZE);

        res.render(path.join(__dirname, '../views/site/category.ejs'), {
            totalPage: totalPage,
            products: products,
            categories: categoryList,
            page: start,
            pages: paginate(start, totalPage),
            title: categoryTitle,
            category: categoryData[0],
            total: total
        })
    } catch(err) {
        console.log(err);
        res.status(500).json("Server error!");
    }  
}

const getProduct = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let product = ProductModel.findOne({ _id: productId });
        let categories = CategoryModel.find();
        let comments = CommentModel.find({ prd_id: productId });
        let productData = await product;
        let categoryList = await categories;
        let commentList = await comments;

        res.render(path.join(__dirname, '../views/site/product.ejs'), {
            product: productData,
            categories: categoryList,
            comments: commentList
        });
    } catch (err) {
        res.status(500).error("Server error!");
    }
}

const addComment = async (req, res, next) => {
    try {
        let prd_id = req.params.id;
        let name = req.body.full_name;
        let email = req.body.email;
        let body = req.body.body;

        await CommentModel.create({
            prd_id: prd_id,
            full_name: name,
            email: email,
            body: body
        })
        res.redirect(req.path);
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

const searchResult = async (req, res, next) => {
    try {
        const keyword = req.query.keyword || "";
        const filter = {};
        if (keyword) {
            filter.$text = {$search: keyword}
        }

        let products = ProductModel.find(filter);
        let categories = CategoryModel.find();
        let productList = await products;
        let categoryList = await categories;

        res.render(path.join(__dirname, '../views/site/search.ejs'), {
            products: productList,
            keyword: keyword,
            categories: categoryList
        })
    } catch (err) {
        res.status(500).json("Server error");
    }
}

module.exports = {
    getHomePage,
    getByCategory,
    getProduct,
    addComment,
    searchResult
}