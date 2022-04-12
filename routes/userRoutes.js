const express = require('express');

const router = express.Router();

const { getUsers, getUser, setUser } = require('../controllers/userController');

// Routes found at 'api/users'
router.route('/').get(getUsers).post(setUser);

// Routes found at '/api/users/:id'
router.route('/:id').get(getUser);

module.exports = router;
