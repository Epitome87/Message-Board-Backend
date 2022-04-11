const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    // Get the value of the token from the Authorization Header
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Our Token's payload stores our User ID
    // So check if this Token is part of our User's Tokens field
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    // No need for route handlers to fetch user again, as we set it here on the req, which routes can access!
    req.user = user;
    req.token = token;

    // Make sure we pass control off to the next middleware
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate! ' });
  }
};
