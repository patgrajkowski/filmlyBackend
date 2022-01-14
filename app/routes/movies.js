const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const { Comment } = require('../models/comment');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

router.post('/', [auth, admin], async (req, res) => {
  const {
    title,
    genre,
    director,
    length,
    rate,
    plot,
    actors,
    img,
    created,
    id,
  } = req.body;
  const { error } = validate({
    title,
    genre,
    director,
    length,
    rate,
    plot,
    actors,
    img,
    created,
    id,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    director: req.body.director,
    length: req.body.length,
    rate: req.body.rate,
    plot: req.body.plot,
    actors: req.body.actors,
    img: req.body.img,
  });
  const movieWithId = new Movie({
    title: movie.title,
    genre: movie.genre,
    director: movie.director,
    length: movie.length,
    rate: movie.rate,
    plot: movie.plot,
    actors: movie.actors,
    img: movie.img,
    id: movie._id,
  });
  await movieWithId.save();

  res.send(movieWithId);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const {
    title,
    genre,
    director,
    length,
    rate,
    plot,
    actors,
    img,
    created,
    id,
  } = req.body;
  const { error } = validate({
    title,
    genre,
    director,
    length,
    rate,
    plot,
    actors,
    img,
    created,
    id,
  });
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genre,
      director: req.body.director,
      length: req.body.length,
      rate: req.body.rate,
      plot: req.body.plot,
      actors: req.body.actors,
      img: req.body.img,
      stock: req.body.stock,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  movie = await Movie.findByIdAndRemove(req.params.id);
  console.log(req.params.id);
  res.send(movie);
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch {
    return res.status(404).send('The movie with the given ID was not found.');
  }
});

module.exports = router;
