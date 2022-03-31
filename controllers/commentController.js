const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');

// @desc Get Comments
// @route GET /api/comments
// @access Public
const getComments = asyncHandler(async (req, res) => {
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

  // Destructure the relevant Comment data from the body of the request
  const { body } = req.body;

  const comment = await Comment.create({ body });
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
