const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 12,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateCustomer(customer) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    address: Joi.string().required(),
    phone: Joi.string().min(9).max(12).required(),
    created: Joi.date(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
