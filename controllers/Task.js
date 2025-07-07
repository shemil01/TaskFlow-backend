const Project = require("../Models/Project");
const Task = require("../Models/Task");

//  create task
exports.createTask = async (req, res) => {
  const { title, status, priority, dueDate, assignee, projectId } = req.body;

  if (!title || !projectId) {
    return res
      .status(400)
      .json({ success: false, message: "Title and Project ID are required" });
  }

  const projectExists = await Project.findById(projectId);
  if (!projectExists) {
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    assignee,
    projectId,
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, data: task });
};

// get all task
exports.getTasks = async (req, res) => {
  const { projectId, assignee } = req.params;

  const filter = {};
  if (projectId) filter.projectId = projectId;
  if (assignee) filter.assignee = assignee;

  const tasks = await Task.find(filter)
    .populate("assignee", "name email")
    .populate("projectId", "name");

  res.status(200).json({ success: true, data: tasks });
};

// get taks by id
exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate("assignee", "name email")
    .populate("projectId", "name");

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "task not found",
    });
  }
  res.status(200).json({ success: true, data: task });
};

// update task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedTask,
  });
};

// Delete Tasks
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  await task.remove();

  res.status(200).json({ success: true, message: "Task deleted successfully" });
};
