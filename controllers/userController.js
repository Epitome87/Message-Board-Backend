const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc Get Users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get User
// @route GET /api/users/:id
// @access Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  getUser,
};
