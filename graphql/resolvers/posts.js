const posts = [
  { title: "title 1", body: "body 1" },
  { title: "title 2", body: "body 2" },
  { title: "title 3", body: "body 3" },
  { title: "title 4", body: "body 4" }
];

module.exports = {
  Query: {
    getPosts() {
      return posts;
    }
  }
};
