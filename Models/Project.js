const mongoose = require("mongoose");
const { refresh } = require("../controllers/Auth");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
