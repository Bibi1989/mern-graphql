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
    throw new UserInputError("Empty fields", {
      error: errors
    });
  }

  const user = await User.findOne({ username });
  const userEmail = await User.findOne({ email });

  const error = {
    email: "This user has register",
    username: "This user has register",
    password: "This user has register"
  };

  if (user)
    throw new UserInputError("Users exist", {
      error: error
    });
  if (userEmail)
    throw new UserInputError("Users exist", {
      error: error
    });

  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString()
  });

  const response = await newUser.save();

  // const { SECRET_KEY } = process.env;

  const token = jwt.sign(
    {
      id: response.id,
      email: response.email,
      username: response.username
    },
    process.env.SECRET_KEY
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
    throw new UserInputError("Empty fields", {
      error: errors
    });
  }

  const user = await User.findOne({ email });
  const error = {
    email: "You have not register",
    password: "You have not register"
  };
  if (!user)
    throw new UserInputError("You have not register", {
      error: error
    });

  validPassword = await bcrypt.compare(password, user.password);

  const passwordError = {
    password: "Invalid password"
  };

  if (!validPassword) {
    throw new UserInputError("Empty fields", {
      error: passwordError
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY
  );

  return {
    ...user._doc,
    id: user._id,
    token
  };
};

module.exports.registerUser = register;
module.exports.loginUser = login;
