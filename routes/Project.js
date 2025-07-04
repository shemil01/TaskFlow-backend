const express = require("express");
const router = express.Router();
const controller = require("../controllers/Project");
const { Trycatch } = require("../utils/TryCatch");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/projects", authMiddleware, Trycatch(controller.createProject));
router.get("/projects", authMiddleware, Trycatch(controller.getAllProjects));
router.get("/projects/:projectId", authMiddleware, Trycatch(controller.getProjectById));
router.put("/projects/:projectId", authMiddleware, Trycatch(controller.editProject));
router.delete("/projects/:projectId", authMiddleware, Trycatch(controller.deleteProject));


module.exports = router