const User = require("../../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async register(
      _parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      _info
    ) {
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password
      });

      const response = await newUser.save();

      const token = jwt.sign(
        {
          id: response.id,
          email: response.email,
          username: response.username
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h"
        }
      );

      return {
        ...response._doc,
        id: response._id,
        token
      };
    }
  }
};
