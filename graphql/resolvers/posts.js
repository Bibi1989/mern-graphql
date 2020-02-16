const Post = require('../../models/postsModel')

module.exports = {
  Query: {
    getPosts() {
      return Post;
    }
  }
};
