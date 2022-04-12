const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, 'An author must be associated with this Post'],
    },
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      minLength: 5,
      // maxLength: 50,
      // TODO: Probably should max length this!
    },
    // TODO: Should a Post have a 'body' associated with it?
    // Or should the Original Poster's message simply be the first item in the Comments array?
    body: {
      type: String,
      required: [true, 'Post must have a body with a message'],
      minLength: 10,
      maxLength: 1000,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    // Likes / Dislikes store an array of User references
    // This way, we can get the count with likes.length
    // And also quickly determine if a User liked a post (to appropriately render an up or down arrow by a Post)
    likes: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      default: 0,
    },
    dislikes: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
