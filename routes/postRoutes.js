const express = require('express');

const router = express.Router();

const {
  getPostWithComments,
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const { setComment, getComments } = require('../controllers/commentController');

// Routes found at 'api/posts'
router.route('/').get(getPosts);

// Routes found at '/api/posts/:id'
router
  .route('/:id')
  .get(getPost)
  .delete(deletePost)
  .put(updatePost)
  .post(setPost);

router.route('/:postId/comments/').get(getPostWithComments).post(setComment);

module.exports = router;
