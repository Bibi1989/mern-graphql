const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: String!
    body: String!
    username: String!
    createdAt: String
  }

  # Users to return
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String
  }

  # Login to return
  # type Login {
  #   id: ID!
  #   email: String!
  #   token: String!
  #   createdAt: String
  # }

  # register input fields argument
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  # login input fields argument
  input LogInput {
    email: String!
    password: String!
  }

  # query methods
  type Query {
    getPosts: [Post]
  }

  # mutation methods
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LogInput): User
  }
`;
