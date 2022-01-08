const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
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
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
      default: () => new Date(+new Date() + 2 * 24 * 60 * 60 * 1000),
    },
    actualDateReturned: {
      type: Date,
      default: null,
    },
  })
);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
