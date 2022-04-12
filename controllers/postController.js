const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

// @desc Get Posts
// @route GET /api/posts
// @access Public
const getPostWithComments = asyncHandler(async (req, res) => {
  // Get the post with the ID provided as a param
  // const postWithComments = await Post.findOne({
  //   _id: req.params.postId,
  // }).populate('comments');

  const postWithComments = await Post.findOne({
    _id: req.params.postId,
  }).populate({ path: 'comments', populate: { path: 'userRef' } });

  console.log(postWithComments);

  res.status(200).json(postWithComments);
});

// @desc Get Posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  // TODO: Most likely never want ALL Posts -- but rather one with an associated sub-forum
  const posts = await Post.find({});

  //   let justIDs = posts.map((item) => item['_id']);
  //   res.status(200).json(justIDs);
  res.status(200).json(posts);
});

// @desc Get Post
// @route GET /api/posts/:id
// @access Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

// @desc Set Post
// @route POST /api/posts
// @access Public
const setPost = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please provide a valid Post');
  }

  // Destructure the relevant Post data from the body of the request
  // TODO: For now we will manually set up some properties just to fill up our database
  // Obviously we wouldn't typically create a Post and immediately shove comments into it!
  const { author, title, body, comments } = req.body;

  const post = await Post.create({ author, title, body, comments });
  res.status(200).json(post);
});

// @desc Update Post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  // Pass in options with kew of "new" set to true -- so we create the document in database if it does not exist
  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc Delete Post
// @route GET /api/Posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  await post.remove();

  res.status(200).json({ id });
});

// Export each controller function for use in a router
module.exports = {
  getPostWithComments,
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
};
