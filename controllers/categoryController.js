const path = require('path');
const CategoryModel = require('../models/categories.js');
const paginate = require('../common/paginate');
const PAGE_SIZE = 4;

const getCategories = async (req, res, next) => {
    let page = req.query.page;
    let start = parseInt(page);
    if (start < 1) {
        start = 1;
    }
    try {
        let data = CategoryModel.find().skip(PAGE_SIZE * (start - 1)).limit(PAGE_SIZE);
        let totalCategories = CategoryModel.countDocuments();
        let listCategories = await data;
        let total = await totalCategories;
        let totalPage = Math.ceil(parseInt(total) / PAGE_SIZE);
        if (listCategories.length > 0) {
            res.render(path.join(__dirname, '../views/category.ejs'), {
                categories: listCategories,
                page: start,
                pages: paginate(start, totalPage),
                totalPage: totalPage
            })
        } else {
            res.json("No catigory data found!");
        }
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

module.exports = {
    getCategories
}