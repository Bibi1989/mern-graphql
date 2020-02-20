const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

// module.exports = req => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     // Bearer
//     const token = authHeader.split("Bearer ")[1];
//     if (token) {
//       try {
//         const user = jwt.verify(token, process.env.SECRET_KEY);
//         return user;
//       } catch (error) {
//         throw new AuthenticationError("Invalid or expired token");
//       }
//     }
//     throw new Error("Authorization token must be 'Bearer [token]'");
//   } else {
//     throw new Error("Authorization header must be povided");
//   }
// };

module.exports = async req => {
  const token = req.headers["auth"];
  if (!token) {
    throw Error("unauthorize user, access denied");
  }

  try {
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    return user;
    console.log(user);
    // return req.user;
  } catch (error) {
    throw new AuthenticationError("Bad token");
  }
};
