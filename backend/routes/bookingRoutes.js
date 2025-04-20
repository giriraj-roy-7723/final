const express = require('express');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Book a service
router.post('/:serviceId', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = {
      user: req.user._id,
      bookingDate: req.body.bookingDate,
      notes: req.body.notes
    };

    service.bookings.push(booking);
    await service.save();

    res.status(201).json({ message: 'Booking request sent successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel a booking (user only)
router.delete('/:serviceId/booking/:bookingId', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = service.bookings.id(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Remove the booking
    booking.remove();
    await service.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (worker only)
router.put('/:serviceId/booking/:bookingId', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if the worker owns this service
    if (service.worker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const booking = service.bookings.id(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = req.body.status;
    await service.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for a worker's services
router.get('/worker', protect, async (req, res) => {
  try {
    const services = await Service.find({ worker: req.user._id })
      .populate('bookings.user', 'username email');
    
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/user', protect, async (req, res) => {
  try {
    const services = await Service.find({ 'bookings.user': req.user._id })
      .populate('worker', 'username email phoneNumber expertise');
    
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;