const express = require('express');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find()
      .populate({
        path: 'worker',
        select: 'username email phoneNumber expertise'
      })
      .populate({
        path: 'bookings.user',
        select: 'username email'
      });
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get worker's services
router.get('/worker', protect, async (req, res) => {
  try {
    const services = await Service.find({ worker: req.user._id })
      .populate({
        path: 'bookings.user',
        select: 'username email'
      });
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new service (worker only)
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ message: 'Only workers can add services' });
  }

  const { name, description, price, category, location } = req.body;

  try {
    const newService = new Service({
      name,
      description,
      price,
      category,
      location,
      worker: req.user._id
    });
    
    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a service (worker only)
router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.worker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a service (worker only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.worker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await service.remove();
    res.json({ message: 'Service removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
