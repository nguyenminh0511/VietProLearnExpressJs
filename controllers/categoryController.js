const path = require('path');
const CategoryModel = require('../models/categories.js');
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
        if (listCategories.length > 0) {
            res.render(path.join(__dirname, '../views/category.ejs'), {
                categories: listCategories,
                page: 1,
                pages: PAGE_SIZE,
                totalPage: Math.ceil(parseInt(total) / PAGE_SIZE)
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