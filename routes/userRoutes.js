const express = require('express');

const router = express.Router();

const { getUsers, getUser } = require('../controllers/userController');

// Routes found at 'api/users'
router.route('/').get(getUsers);

// Routes found at '/api/users/:id'
router.route('/:id').get(getUser);

module.exports = router;
