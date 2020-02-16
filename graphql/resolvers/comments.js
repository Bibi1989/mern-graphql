const Post = require("../../models/postsModel");
const auth = require("../../utils/auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, { req }) => {
      const { username } = auth(req);
      if (body.trim() === "") {
        throw new UserInputError("Comment is empty", {
          error: {
            body: "Comment body must not be empty"
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post do not exist");
      }
    },

    async deleteComment(_, { postId, commentId }, { req }) {
      const { username } = auth(req);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(
          index => index.id === commentId
        );
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("User can't delete this comment");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
};
