const { UserInputError } = require("apollo-server");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../utils/validators");

const register = async registerInput => {
  let { username, email, password, confirmPassword } = registerInput;
  const { errors, valid } = validateRegister(
    username,
    email,
    password,
    confirmPassword
  );

  if (!valid) {
    throw new UserInputError("Errors", errors);
  }

  const user = await User.findOne({ username });
  const userEmail = await User.findOne({ email });

  if (user)
    throw new UserInputError("Users exist", {
      error: {
        email: "This user has register"
      }
    });
  if (userEmail)
    throw new UserInputError("Users exist", {
      error: {
        email: "This email has register"
      }
    });

  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    username,
    password
  });

  const response = await newUser.save();

  const { SECRET_KEY } = process.env;

  const token = jwt.sign(
    {
      id: response.id,
      email: response.email,
      username: response.username
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  return {
    ...response._doc,
    id: response._id,
    token
  };
};

const login = async loginInput => {
  let { email, password } = loginInput;
  const { errors, valid } = validateLogin(email, password);

  if (!valid) {
    throw new UserInputError("Errors", errors);
  }

  const user = await User.findOne({ email });
  if (!user)
    throw new UserInputError("You have not register", {
      error: {
        email: "This email has not register"
      }
    });

  validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new UserInputError("Incorrect password", {
      error: {
        password: "Incorrect password"
      }
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  return {
    ...user._doc,
    id: user._id,
    token
  };
};

module.exports.registerUser = register;
module.exports.loginUser = login;
