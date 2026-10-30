const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth")

const { getNotifications } = require("../controller/notificationController");


router.get("/", auth, getNotifications);

module.exports = router;