const mongoose = require('./index');

const categoriesSchema = new mongoose.Schema({
    description: String,
    title: String,
    slug: String
}, {
    collection: 'categories'
})

const CategoriesModel = mongoose.model("categories", categoriesSchema);

module.exports = CategoriesModel;
