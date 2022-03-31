const mongoose = require('mongoose');

// Define the shape of a User model
const userSchema = mongoose.Schema(
  {
    // The name the user wishes to be known by on the site
    username: {
      type: String,
      required: [true, 'Please enter a user name'],
    },
    // The user's real name (for use in certain scenarios)
    name: {
      type: String,
    },
    // A URL which serves as the user's profile picture
    imageURL: {
      type: String,
      required: false,
    },
    favoriteStocks: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
