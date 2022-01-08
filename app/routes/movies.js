const { Movie, validate } = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const { Rental } = require('../models/rental');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
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
  await movie.save();

  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

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

router.delete('/:id', async (req, res) => {
  const rental = await Rental.find({ 'movie._id': xd });
  if (rental) {
    movie = await Movie.findByIdAndRemove(req.params.id);
  }

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

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
