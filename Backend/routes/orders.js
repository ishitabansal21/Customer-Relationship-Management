const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// Add a new order
router.post('/', async (req, res) => {
  const { customerId, amount } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const newOrder = new Order({ customerId, amount });
    const savedOrder = await newOrder.save();

    // Update customer totalSpends and visits
    customer.totalSpends += amount;
    customer.visits += 1;
    customer.lastVisit = Date.now();
    await customer.save();

    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
