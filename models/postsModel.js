const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: {
          type: Date,
          default: Date.now
      }
    }
  ],
  comments: [
    {
      username: String,
      createdAt: {
          type: Date,
          default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("User", postSchema);
