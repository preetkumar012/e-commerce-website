
const productModel = require('../models/productModels.js')
const uploadProductPermission = require('../helpers/permissions.js')

const uploadProductController = async (req, res) => {

    try {
        // const uploadProduct = new productModel(req.body)
        const sessionUserId =req.userId
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "product upload successfully",
            error: false,
            success: true,
            data: saveProduct
        })


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = uploadProductController;