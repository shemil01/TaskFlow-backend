const Project = require("../Models/Project");
const User = require("../Models/User");

//  create project
exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;
  const currentUser = await User.findById(user.id);
  const project = await Project.create({
    name,
    description,
    orgId: currentUser.orgId,
    createdBy: user.id,
    members: [user.id],
  });
  res.status(201).json({ success: true, project });
};

//  get all projects
exports.getAllProjects = async (req, res) => {

  console.log(req.user.id)
  const projects = await Project.find({ members: req.user.id }).populate(
    "members"
  ).populate('createdBy');
  if (!projects) {
    return res.status(404).json({
      success: false,
      message: "Project is empty",
    });
  }
  res.status(200).json({ projects });
};
//  get project by id
exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }
  res.status(200).json({ project });
};

// edit project
exports.editProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, members } = req.body;

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      ...(name && { name }),
      ...(description && { description }),
      ...(members && { members }),
    },
    { new: true, runValidators: true }
  );
  if (!updatedProject) {
    return res.status(404).json({
      success: false,
      message: "Projectd is empty",
    });
  }
  res.status(200).json({ success: true, project: updatedProject });
};

// deleate project
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  await Project.findByIdAndDelete(projectId);

  res.status(200).json({
    success: true,
    message: "project deleted successfully",
  });
};
