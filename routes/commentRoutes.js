const express = require('express');

const router = express.Router();

const {
  getComments,
  getComment,
  setComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

// Routes found at 'api/comments'
router.route('/').get(getComments);
// .post(setComment);

// Routes found at '/api/comments/:id'
router.route('/:id').get(getComment).delete(deleteComment).put(updateComment);

module.exports = router;
