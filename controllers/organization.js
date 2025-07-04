const Organization = require("../Models/Organization");
const User = require("../Models/User");

// create organization
exports.createOrganization = async (req,res) => {
  const { name } = req.body;
console.log(name)
  const org = await Organization.create({
    name, 
  });
  console.log("useid:",req.user.id)
  await User.findByIdAndUpdate(req.user.id, { orgId: org._id });
  res.status(201).json({
    success: true,
    org,
  });
};
   