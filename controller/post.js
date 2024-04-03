import Post from "../models/Post.js";

export const addPost = async (req, res, next) => {
  let newPost = new Post({
    creatorId: req.user.id,
    ...req.body,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
};
