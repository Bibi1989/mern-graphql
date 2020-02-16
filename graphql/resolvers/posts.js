const Post = require("../../models/postsModel");
const Auth = require("../../utils/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getAPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  Mutation: {
    async createPost(_, { body }, { req }) {
      const user = Auth(req);
      console.log(user);
      try {
        const newPost = await new Post({
          body,
          user: user.id,
          username: user.username,
          email: user.email
        });
        const post = newPost.save();
        return post;
      } catch (error) {
        throw new Error("Server error");
      }
    }
  }
};
