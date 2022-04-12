const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    author: {
      // TODO: Should we store this directly, or just retrieve it from userRef?
      type: String,
      required: [true, 'An author must be associated with this Comment'],
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user reference must be associated with this Comment'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    body: {
      type: String,
      required: [true, 'Please enter a valid Comment'],
      minLength: 10,
      maxLength: 1000,
    },
    // TODO: This might be an object with a count / list of Users
    likes: {
      type: Number,
      default: 0,
    },
    // TODO: This might be an object with a count / list of Users
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Comment', commentSchema);
