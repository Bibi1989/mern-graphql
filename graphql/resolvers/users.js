const {
  registerUser,
  loginUser
} = require("../../controllers/usersController");

module.exports = {
  Mutation: {
    //   register mutation logic
    register(_, { registerInput }) {
      return registerUser(registerInput);
    },

    // login mutation logic
    login(_parent, { loginInput }) {
      return loginUser(loginInput);
    }
  }
};
