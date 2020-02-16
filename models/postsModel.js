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
  email: {
    type: String,
    required: true
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: {
          type: Date,
          default: Date.now()
      }
    }
  ],
  likes: [
    {
      username: String,
      createdAt: {
          type: Date,
          default: Date.now()
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model("post", postSchema);
