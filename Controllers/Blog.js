const mongoose = require("mongoose");
const BlogSchema = require("../Models/Blog");
const ContactSchema = require("../Models/Contact");

// Create new Post
exports.createPost = async (req, res) => {
  const newPost = new BlogSchema(req.body);
  try {
    await newPost.save();
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post
exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await BlogSchema.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await BlogSchema.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await BlogSchema.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
exports.likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await BlogSchema.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline POsts
exports.getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await BlogSchema.find({ userId: userId });
    const followingPosts = await ContactSchema.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
