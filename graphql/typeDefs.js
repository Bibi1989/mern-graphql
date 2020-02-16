const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    title: String!
    body: String!
  }
  type User {
    email: String!
    username: String!
    token: String!
    id: ID!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
  }
  type mutation{
    register(registerInput: RegisterInput): User
  }
`;
