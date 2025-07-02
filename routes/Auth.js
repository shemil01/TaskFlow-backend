const express = require("express");
const router = express.Router();
const controller = require("../controllers/Auth");
const { Trycatch } = require("../utils/TryCatch");

router.post('/signup',Trycatch(controller.register))
router.post('/login',Trycatch(controller.login))
router.post('/google-auth',Trycatch(controller.googleAuth))
router.all("/refresh-token", Trycatch(controller.refresh));

module.exports = router