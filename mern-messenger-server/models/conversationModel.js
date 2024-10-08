const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
