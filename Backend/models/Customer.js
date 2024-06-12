const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpends: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
