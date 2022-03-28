const path = require("path");
const ProductModel = require('../models/products');
const CategoryModel = require('../models/categories');
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

module.exports = {
    getHomePage,
    getByCategory
}