const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Regular User Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ username, email, password });

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Worker Register Route
router.post('/worker/register', async (req, res) => {
  const { username, email, password, phoneNumber, expertise } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newWorker = await User.create({
      username,
      email,
      password,
      phoneNumber,
      expertise,
      role: 'worker'
    });

    const token = generateToken(newWorker._id);

    res.status(201).json({
      message: 'Worker registered successfully',
      user: {
        id: newWorker._id,
        username: newWorker.username,
        email: newWorker.email,
        role: newWorker.role,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Regular User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Worker Login Route
router.post('/worker/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const worker = await User.findOne({ email, role: 'worker' });
    if (!worker) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await worker.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(worker._id);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: worker._id,
        username: worker.username,
        email: worker.email,
        role: worker.role,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
