const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Movie = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    length: {
      type: Number,
      required: true,
      min: 1,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    plot: {
      type: String,
      required: true,
    },
    actors: {
      type: [
        new mongoose.Schema({
          firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
          },
          lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
          },
          img: {
            type: String,
          },
          role: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
          },
        }),
      ],
      required: true,
    },
    img: { type: String, required: true },
    created: {
      type: Date,
      default: Date.now,
    },
    id: {
      type: String,
    },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genre: Joi.string().required(),
    director: Joi.string().min(5).max(255).required(),
    length: Joi.number().min(1).required(),
    rate: Joi.number().min(1).max(10).required(),
    plot: Joi.string().required(),
    actors: Joi.array().required(),
    img: Joi.string().required(),
    created: Joi.date(),
    id: Joi.objectId(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
