const express = require('express')
const userSignUpController = require('../controllers/userSignUp.js')
const userSignInControler = require('../controllers/userSignIn.js')
const userDetailsController = require('../controllers/userDetails.js')
const authTokenMiddleware = require('../middlewares/authToken.js')
const userLogout = require('../controllers/userLogout.js')

const allUsers = require('../controllers/allUsers.js')
const updateUser = require('../controllers/updateUser.js')
const uploadProductController = require('../controllers/uploadProduct.js')
const getProductController = require('../controllers/getProduct.js')
const updateProductController = require('../controllers/updateProduct.js')

const router = express.Router()

router.post('/signup', userSignUpController)
router.post('/signin', userSignInControler)
router.get('/user-details', authTokenMiddleware, userDetailsController)
router.get('/userLogout', userLogout)

// admin-panel api

router.get('/all-user', authTokenMiddleware, allUsers)
router.post('/update-user', authTokenMiddleware, updateUser)

//  upload product route api

router.post('/upload-product', authTokenMiddleware, uploadProductController)
router.get('/get-product', getProductController)
// router.post('/update-product', authTokenMiddleware, updateProductController)
router.post('/update-product', authTokenMiddleware, updateProductController)

module.exports = router

