const Organization = require("../Models/Organization");
const User = require("../Models/User");

// create organization
exports.createOrganization = async (res, req) => {
  const { name } = req.body;

  const org = await Organization.create({
    name,
  });
  await User.findByIdAndUpdate(req.user.id, { orgId: org._id });
  res.status(201).json({
    success: true,
    org,
  });
};
