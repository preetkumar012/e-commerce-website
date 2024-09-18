const userModel = require('../models/userModels.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userSignInControler = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("please provide the email")
        }
        if (!password) {
            throw new Error("please provide the password")
        }


        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        // console.log("password", checkPassword)
        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email

            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.cookie("token", token, tokenOption).json({
                message: "Login successfully",
                data: token,
                error: false,
                success: true
            })

        } else {
            throw new Error("please check the password")
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = userSignInControler;
