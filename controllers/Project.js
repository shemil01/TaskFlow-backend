const Project = require("../Models/Project");

//  create project
exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;

  const project = await Project.create({
    name,
    description,
    orgId: user.orgId,
    createdBy: user.id,
    members: [user.id],
  });
  res.status(201).json({ success: true, project });
};
