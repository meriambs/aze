const express = require("express");
//const { GetBlogs, AddBlog, UpdateBlog, DeleteBlog, GetById } = require("../Controllers/blog");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../Controllers/Blog");

const BlogRouter = express.Router();

//get path
BlogRouter.get("/getBlog", getPost);

//post path
BlogRouter.post("/addBlog", createPost);

//put path
BlogRouter.put("/updBlog/:id", updatePost);

//delete path
BlogRouter.delete("/rmvBlog/:id", deletePost);

//get path
BlogRouter.get("/getBlog/:id", getPost);

module.exports = BlogRouter;
