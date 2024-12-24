const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now // Set default value to current timestamp
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure unique email for each user
  },
  nationality: {
    type: String
  },
  countryFlag: {
    type: String
  },
  nationalID: {
    type: String
  }
});

const Guests = mongoose.models?.guests || mongoose.model('guests', guestSchema);

module.exports = Guests;


// _id: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true
// },
// id: {
//   type: Number,
//   required: true,
//   unique: true // Ensure unique ID for each user
// },