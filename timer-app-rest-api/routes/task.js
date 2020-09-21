const { Router } = require("express");
const TaskController = require("../controllers/task");
const router = Router();

router.post("/tasks", TaskController.addTask);

router.get("/tasks", TaskController.getTasks);

module.exports = router;
