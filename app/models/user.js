const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    nickname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    id: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  })
);

function validateUser(user) {
  const schema = {
    nickname: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    created: Joi.date(),
    id: Joi.string(),
    isAdmin: Joi.boolean(),
  };
  const { nickname, email, password, created } = user;
  return Joi.validate({ nickname, email, password, created }, schema);
}

exports.User = User;
exports.validate = validateUser;
