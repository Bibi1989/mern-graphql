const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/postsModel");
const Auth = require("../../utils/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
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
    },

    async deletePost(_, { postId }, { req }) {
      const user = Auth(req);
      try {
        const post = await Post.findById(postId);
        if (post === null) return "Comment Not Found";
        if (post.username === user.username) {
          await Post.findByIdAndDelete(postId);
          return "Deleted successfully!!!";
        } else {
          throw new AuthenticationError("You Can't Delete This Post");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async likePost(_, { postId }, { req }) {
      const { username } = auth(req);

      const posts = await post.findById(postId);
      if (posts) {
        const findPost = posts.find(post => post.username === username);
        if (findPost) {
          throw new UserInpuError("You already like this post");
        } else {
          await post.likes.unshift({
            username
          });
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
};
