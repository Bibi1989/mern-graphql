const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = req => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer
    const token = authHeader.split("Bearer ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
    throw new Error("Authorization token must be 'Bearer [token]'");
  } else {
    throw new Error("Authorization header must be povided");
  }
};
