const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numNights: { type: Number, required: true },
  numGuests: { type: Number, required: true },
  cabinPrice: { type: Number, required: true },
  extraPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'unconfirmed'], default: 'pending', required: true }, 
  hasBreakfast: { type: Boolean, required: true, default: false },
  isPaid: { type: Boolean, required: true, default: false },
  observations: { type: String },
  cabinId: {type: String},
  guestId: {type: mongoose.Schema.Types.ObjectId}
  // cabinId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabin', required: true }, // Assuming Cabin is another model
  // guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true } // Assuming Guest is another model
});

// _id: {
//   type: mongoose.Schema.Types.ObjectId,
// },

// module.exports = mongoose.model('Booking', bookingSchema);

const Bookings = mongoose.models?.bookings || mongoose.model('bookings', bookingsSchema);

module.exports = Bookings ;