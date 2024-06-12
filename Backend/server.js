const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');

app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () =>
console.log(`Server is listening on port ${port}...`)
);
