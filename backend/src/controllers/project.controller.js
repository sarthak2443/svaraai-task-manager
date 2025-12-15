const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    userId: req.user.id
  });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
