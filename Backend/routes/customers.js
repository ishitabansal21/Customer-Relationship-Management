const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add a new customer
router.post('/', async (req, res) => {
  const { name, email, totalSpends, visits, lastVisit } = req.body;

  try {
    const newCustomer = new Customer({ name, email, totalSpends, visits, lastVisit });
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all customers
router.get('/', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
