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
  try {
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
    if (!error) {
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
      res.send(201);
    }
    if (error) {
      res.status(400).send(error.details[0].message);
    }
  } catch (e) {
    console.log(e);
  }
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
  if (error) res.status(400).send(error.details[0].message);
  if (!error) {
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
  }
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
