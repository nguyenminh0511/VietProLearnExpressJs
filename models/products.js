const mongoose = require('./index');
const productSchema = new mongoose.Schema({
    thumbnail: String,
    description: String,
    price: Number,
    cat_id: {
        type: mongoose.Types.ObjectId,
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
    timestamps: true
}, {
    collection: 'products'
})

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;