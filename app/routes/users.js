const config = require('config');
const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});
router.get('/me', auth, async (req, res) => {
  const { nickname, avatar, _id } = await User.findById(req.user._id);
  res.send({ nickname, avatar, _id });
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');
  user = new User(
    _.pick(req.body, ['nickname', 'email', 'password', 'avatar'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  let userWithId = new User({
    nickname: user.nickname,
    email: user.email,
    password: user.password,
    id: user._id,
    avatar: user.avatar,
  });
  console.log(user._id);
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get('jwtSecret')
  );
  await userWithId.save();

  res.header('x-auth-token', token).send(userWithId);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/:id', [auth, admin], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router;
