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
    created: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateComment(comment) {
  const schema = {
    userId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
