const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  regularPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Cabin', cabinSchema);