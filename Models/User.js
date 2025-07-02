const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  authType: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },

  role: {
    type: String,
    enum: ["admin", "manager", "developer"],
    default: "developer",
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organiation",
  },
});

module.exports = mongoose.model("User", userSchema);
