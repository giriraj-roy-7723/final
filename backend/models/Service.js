const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  availability: { type: Boolean, default: true },
  location: { type: String, required: true },
  bookings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    requestDate: { type: Date, default: Date.now },
    bookingDate: Date,
    notes: String
  }]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
