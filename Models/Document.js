const mongoose = require("mongoose");

const documentSchema  = new mongoose.Schema(
  {
    title: String,
    content: { type: String},
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    cretedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema );
