const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    author: {
      // TODO: Should this be an ObjectID? The downside is we would have to populate or fetch the author's name
      // for each Comment. It may be better just to store their name directly, and resort to fetching an Author's full
      // information only when we are viewing their profile / message history
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'User',
      type: String,
      required: [true, 'An author must be associated with this Comment'],
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
    // TODO: Will a Comment need a reference to a 'parent' Comment?
    // This may be necessary if I support Comment nesting
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Comment', commentSchema);
