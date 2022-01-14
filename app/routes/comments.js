const { Comment, validate } = require('../models/comment');
const { Movie } = require('../models/movie');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const comments = await Comment.find().sort('-created');
  res.send(comments);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.customerId);
  if (!user) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  const comment = new Comment({
    customer: {
      _id: user._id,
      nickname: user.nickname,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
  });
  res.send(comment);
});

router.get(':id', async (req, res) => {
  try {
    const comments = await Comment.find({ 'movie._id': req.params.id });
    res.send(comments);
  } catch {
    return res.status(404).send('There are no comments for this movie');
  }
});
router.get('/user/comments', async (req, res) => {
  try {
    console.log(req.params.id);
    const comments = await Comment.find({ 'customer._id': req.params.id });
    console.log(comments);
    if (comments.length === 0)
      return res.status(404).send('This user has not commented on any movie');
    res.send(comments);
  } catch {
    return res.status(404).send('This user has not commented on any movie');
  }
});

module.exports = router;
