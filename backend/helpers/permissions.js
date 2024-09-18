
const userModel = require('../models/userModels.js')
const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId)

    if (!user) {
        throw new Error('User not found');
    }

    if (user.role !== "ADMIN") {
        return false
    }
    return true
}
module.exports = uploadProductPermission