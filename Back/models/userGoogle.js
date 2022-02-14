const mongoose = require('mongoose');

const userGoogleSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  // onFollow: { type: Array },
});

module.exports = mongoose.model('UserGoogle', userGoogleSchema);
