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
  .connect(
    'mongodb://patgrajkowski:sjV7q93CQgBzTvQc@cluster0-shard-00-00.v1blu.mongodb.net:27017,cluster0-shard-00-01.v1blu.mongodb.net:27017,cluster0-shard-00-02.v1blu.mongodb.net:27017/wypozyczalnia?ssl=true&replicaSet=atlas-6mm1sf-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
