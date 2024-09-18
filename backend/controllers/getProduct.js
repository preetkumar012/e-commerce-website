
const productModel = require('../models/productModels')
const getProductController = async (req, res) => {

    try {
        const allProduct = await productModel.find().sort({createdAt: -1})
        res.json({
            message: " find all product successfully",
            error: false,
            success: true,
            data: allProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = getProductController