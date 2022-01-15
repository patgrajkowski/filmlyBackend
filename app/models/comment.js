const Joi = require('joi');
const mongoose = require('mongoose');

const Comment = mongoose.model(
  'Comment',
  new mongoose.Schema({
    user: {
      type: new mongoose.Schema({
        nickname: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        avatar: {
          type: String,
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
    comment: {
      type: String,
      trim: true,
      minlength: 10,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateComment(comment) {
  const schema = {
    comment: Joi.string().min(10).required(),
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
