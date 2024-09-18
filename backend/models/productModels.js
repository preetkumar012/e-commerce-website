const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname: String,
    brand: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
}, { timestamps: true })
const productModel = mongoose.model('product', productSchema)
module.exports = productModel