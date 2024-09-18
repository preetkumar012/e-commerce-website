
const userModel = require('../models/userModels.js')

const userDetailsController = async (req, res) => {
    try {
        // console.log('userId :', req.userId)
        const user = await userModel.findById(req.userId)
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User Details"
        })
        console.log("user", user)
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = userDetailsController
