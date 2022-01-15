const { Comment, validate } = require('../models/comment');
const { Movie } = require('../models/movie');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const comments = await Comment.find().sort('-created');
  res.send(comments);
});

router.post('/movie/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('Invalid movie.');

  const comment = new Comment({
    user: {
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
    comment: req.body.comment,
  });
  res.send(comment);
  await comment.save();
});

router.get('/movie/:id', async (req, res) => {
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
