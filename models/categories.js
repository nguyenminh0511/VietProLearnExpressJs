const mongoose = require('./index');

const catrgoriesSchema = new mongoose.Schema({
    description: String,
    title: String,
    slug: String
}, {
    collection: 'categories'
})

const CategoriesModel = mongoose.model("categories", catrgoriesSchema);

module.exports = CategoriesModel;
