 const express = require('express')

 const {registerUser, userLogin, verifyOTP ,changePassword, changeTransactionPin }= require('../controller/authController')

 const router = express.Router();

 router.post('/register',registerUser)

 router.post('/verify-otp',verifyOTP)

 router.post('/login',userLogin)


 
 module.exports = router;