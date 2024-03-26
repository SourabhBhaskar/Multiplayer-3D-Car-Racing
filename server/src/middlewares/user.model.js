const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// User'connections'all connection schema
const connectionSchema = new mongoose.Schema(
  {
    bio: {
      username: { type: String, default: "" },
      email: { type: String, default: "" },
      mobile_number: { type: String, default: "" },
      profile_picture: { type: String, default: "" },
      status: { type: String, default: "" },
      description: { type: String, default: "" },
      last_seen: { type: String, default: "" },
      location: { type: String, default: "" },
    },
    messages: {
      messageList: { type: Array, default: [] },
      unSeenMsgCnt: { type: Number, default: 0 },
      isSeen: { type: Boolean, default: true },
    },
    settings: {
      isNotificationOn: { type: Boolean, default: true },
      isBlocked: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
    }
  },
  { _id: false }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    mobile_number: { type: String, default: "" },
    password: { type: String, required: true },
    profile_picture: { type: String, default: "" },
    status: { type: String, default: "Available" },
    description: { type: String, default: "" },
    last_seen: { type: String, default: Date.now() },
    location: { type: String, default: "" },
    connections: { type: [connectionSchema], default: [] },
    groups: { type: Object, default: {} },
    settings: { type: Object, default: {} },
  },
  { minimize: false }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Get User
userSchema.statics.getUser = function () {
  return {
    __v: 0,
    _id: 0,
    password: 0,
    connections: 0,
    groups: 0,
    settings: 0,
  };
};


// Get Connections
userSchema.statics.getNewlyAddedConnection = function () {
  return {
    __v: 0,
    _id: 0,
    username: 0,
    email: 0,
    mobile_number: 0,
    password: 0,
    profile_picture: 0,
    status: 0,
    description: 0,
    last_seen: 0,
    location: 0,
    connections: { $slice: -1 },
    groups: 0,
    settings: 0
  }
}


// User Model
const User = mongoose.model("User", userSchema);


// Export
module.exports = { User };
