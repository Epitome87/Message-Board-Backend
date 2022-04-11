const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');

// Define the shape of a User model
const userSchema = mongoose.Schema(
  {
    // The name the user wishes to be known by on the site
    username: {
      type: String,
      required: [true, 'Please enter a user name'],
      trim: true,
    },
    // The user's real name (for use in certain scenarios)
    name: {
      type: String,
      default: 'Anonymous',
    },
    // A URL which serves as the user's profile picture
    imageURL: {
      type: String,
      required: false,
    },
    favoriteStocks: {
      type: [String],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// This function is available on all instances of a User
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecret');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// This function is available on the Model itself
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  // No User with this email found?
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // Password incorrect?
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  // User with email / password combination was successfully found!
  return user;
};

// This method will be called right before a User model is saved
// Hash the plain-text password before saving
userSchema.pre('save', async function (next) {
  // This is the individual User we are about to save
  const user = this;

  // No need to hash password if password hasn't even been modified (which will be the case upon user Registration or user editing their password)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // Signal that we are done and ready to pass control
  next();
});

// Delete a User's Comments / Posts when the User is deleted?
// For now, we will not use this -- as maybe we want to keep a history of a deleted User's Posts / Comments
userSchema.pre('remove', async function (next) {
  // This is the individual User we are about to delete
  const user = this;

  await Comment.deleteMany({ author: user._id });
  await Post.deleteMany({ author: user._id });

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
