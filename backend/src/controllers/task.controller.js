const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

exports.getTasks = async (req, res) => {
  const {
    projectId,
    status,
    priority,
    page = 1,
    limit = 10
  } = req.query;

  const filter = {};
  if (projectId) filter.projectId = projectId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(tasks);
};
