const Post = require('../../models/postsModel')

module.exports = {
  Query: {
    async getPosts() {
      return await Post.find({});
    }
  }
};
