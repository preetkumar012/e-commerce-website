const userModel = require('../models/userModels.js')
const allUsers = async (req, res) => {
    try {
        console.log(' userId all -user', req.userId)
        const allUsers = await userModel.find()
        console.log(allUsers)
        res.json({
            message: "all user",
            data: allUsers,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            message: false
        })

    }

}
module.exports = allUsers