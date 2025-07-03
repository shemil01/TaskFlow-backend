const express = require("express");
const router = express.Router();
const controller = require("../controllers/Project");
const { Trycatch } = require("../utils/TryCatch");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/projects", authMiddleware, Trycatch(controller.createProject));


module.exports = router