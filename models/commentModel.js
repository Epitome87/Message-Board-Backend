const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    author: {
      // TODO: In the future this will be a reference to another schema
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'User',
      type: String,
    },
    body: {
      type: String,
      required: [true, 'Please enter a valid Comment'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
