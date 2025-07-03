const express = require("express");
const router = express.Router();
const controller = require("../controllers/organization");
const { Trycatch } = require("../utils/TryCatch");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/organizations", authMiddleware, Trycatch(controller.createOrganization));


module.exports = router