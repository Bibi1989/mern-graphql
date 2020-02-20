const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/postsModel");
const Auth = require("../../utils/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: 1 });
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
    async createPost(_, { body }, { req, pubsub }) {
      const user = await Auth(req);
      const posts = new Post({
        body,
        user: user.id,
        username: user.username,
        email: user.email,
        createdAt: new Date().toISOString()
      });
      const post = await posts.save();
      // pubsub.publish('NEW_POST', {
      //     newPost: post
      // })
      return post;
    },

    async deletePost(_, { postId }, { req }) {
      const user = await Auth(req);
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
      const user = await Auth(req);

      const posts = await Post.findById(postId);
      console.log("postlike", posts, user.username);
      if (posts) {
        if (posts.likes.find(like => like.username === user.username)) {
          posts.likes = posts.likes.filter(like => like.username !== user.username);
        } else {
          posts.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          });
        }
        await posts.save();
        return posts;
      } else {
        throw new UserInputError("Post is not found");
      }
    }
  }

  //   Subscription: {
  //       newPost: (_, __, {req, pubsub}) => pubsub.asyncIterator('NEW_POST')
  //   }
};
