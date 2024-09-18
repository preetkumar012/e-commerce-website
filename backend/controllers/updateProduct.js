
const uploadProductPermission = require('../helpers/permissions.js')
const productModel = require('../models/productModels.js')
const updateProductController = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("permission denied")
        }
        const { _id, ...resBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)
        res.json({
            message: "product update is successfully",
            error: false,
            success: true,
            data: updateProduct,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}
module.exports = updateProductController;