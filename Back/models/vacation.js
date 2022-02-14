const mongoose = require('mongoose');

const vacationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  followersID: { type: Array, required: true },
});

module.exports = mongoose.model('Vacation', vacationSchema);
