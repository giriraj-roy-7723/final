const express = require('express');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware'); // 👈 import it correctly

const router = express.Router();

// ✅ Protected: Add a new service
router.post('/', protect, async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = new Service({ name, description, price });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public: Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
