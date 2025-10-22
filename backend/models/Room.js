const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: String,
  users: [
    {
      userId: String,
      name: String,
      socketId: String,
      isOnline: { type: Boolean, default: true },
      lastSeen: { type: Date, default: null },
    },
  ],
  code: String,
  language: {
    type: String,
    default: "javascript",
    enum: ["javascript"],
  },
  theme: { type: String, default: "dark" },
  messages: [
    {
      userId: String,
      userName: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
      type: { type: String, default: "message" },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
