const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./routes/auth');
const comments = require('./routes/comments');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
mongoose
  .connect(config.get('mongoUrl'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/comments', comments);
app.use('/api/auth', auth);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
