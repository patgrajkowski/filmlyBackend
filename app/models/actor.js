const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    img: { type: String, required: true },
    role: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validateActor(actor) {
  const schema = {
    firstname: Joi.string().min(5).max(50).required(),
    lastname: Joi.string().min(5).max(50).required(),
    img: Joi.string(),
    role: Joi.string().min(1).max(50).required(),
  };

  return Joi.validate(actor, schema);
}

exports.Customer = User;
exports.validate = validateActor;
