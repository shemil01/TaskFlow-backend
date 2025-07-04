const Project = require("../Models/Project");
const User = require("../Models/User");

//  create project
exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;
  const currentUser = await User.findById(user.id)
  console.log(" id::",currentUser)
  console.log("org id::",user.orgId)
  const project = await Project.create({
    name,
    description,
    orgId: currentUser.orgId,
    createdBy: user.id,
    members: [user.id],
  });
  res.status(201).json({ success: true, project });
};
