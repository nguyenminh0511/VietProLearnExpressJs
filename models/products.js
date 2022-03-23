const mongoose = require('./index');
const productSchema = new mongoose.Schema({
    thumbnail: String,
    description: String,
    price: Number,
    cat_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'categories'
    },
    status: String,
    featured: Boolean,
    promotion: String,
    warrantly: String,
    accessories: String,
    is_stock: Boolean,
    name: String,
    slug: String
}, {
    collection: 'products'
})

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;