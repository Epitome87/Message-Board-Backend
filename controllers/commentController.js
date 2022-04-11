const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const mongoose = require('mongoose');

const getCommentsForPost = asyncHandler(async (req, res) => {
  // Is a Post ID specified? Get Comments for THAT Post!
  const comments = await Comment.find({ post: req.params.postId });
  res.status(200).json(comments);
});

// @desc Get Comments
// @route GET /api/comments
// @access Public
const getComments = asyncHandler(async (req, res) => {
  // We will most likely never want ALL the Comments in the entire database!
  // So let's let them be queried based on which Post they are associated with
  // TODO: Query by User, too? Or should that be a User controller feature?
  // const match = {};
  // if (req.query.postID) {
  //   match.postID = req.query.postID;
  // }

  await Comment.find({});
  const comments = await Comment.find({});
  res.status(200).json(comments);
});

// @desc Get Comment
// @route GET /api/comments/:id
// @access Public
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  res.status(200).json(comment);
});

// @desc Set Comment
// @route POST /api/comments
// @access Public
const setComment = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please provide a valid comment');
  }

  // /api/posts/:id will store the ID of our desired Post
  const { postId } = req.params;

  // Destructure the relevant Comment data from the body of the request
  const { author, body } = req.body;

  // Create and save the actual Comment
  const comment = await Comment.create({ author, body, post: postId });

  // Due to our two-way relationship in the database, let's also manually add this Comment to the appropriate Post
  const post = await Post.findById(postId);
  console.log('POST ID and Post', postId, post);
  post.comments.push(comment);
  await post.save();

  res.status(200).json(comment);
});

// @desc Update Comment
// @route PUT /api/comments/:id
// @access Private
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  }

  // Pass in options with kew of "new" set to true -- so we create the document in database if it does not exist
  const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedComment);
});

// @desc Delete Comment
// @route GET /api/comments/:id
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = Comment.findById(id);

  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  }

  await comment.remove();

  res.status(200).json({ id });
});

// Export each controller function for use in a router
module.exports = {
  getComments,
  getComment,
  setComment,
  updateComment,
  deleteComment,
};
