const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

mongoose
  .connect('mongodb://localhost/wypozyczalnia')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
