const userModel = require('../models/userModels.js')

const updateUser = async (req, res) => {
    try {
        const sessionUser = req.userId
        const { userId, name, email, role } = req.body
        const payload = {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(role && { role: role }),
        }
        const user= await userModel.findById( sessionUser)
        console.log("user role",user.role)
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            message: "User Updated",
            data: updateUser,
            error: false,
            success: true
        })


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = updateUser;