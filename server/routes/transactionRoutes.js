const express = require('express')
const router = express.Router()

const auth = require("../midleware/auth")
const { depositMoney, sendMoney, getTransactions, getBalance,changePassword, changeTransactionPin  } = require('../controller/transactionController')

router.post('/deposit', auth, depositMoney);

router.post('/send', auth, sendMoney);

router.get('/history', auth, getTransactions);

router.get("/balance", auth, getBalance);

router.put("/change-password", auth, changePassword);

router.put("/change-pin", auth, changeTransactionPin);

module.exports = router