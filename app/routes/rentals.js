const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');
  if (movie.stock === 0)
    return res.status(200).send('Cannot rent movie, no stock left.');

  const rental = new Rental({
    customer: {
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
  });
  await Movie.findByIdAndUpdate(movie._id, { stock: movie.stock - 1 });
  await rental.save();
  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

router.get('/movie/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const rental = await Rental.find({ 'movie._id': req.params.id });
    res.send(rental);
  } catch {
    return res.status(404).send('The rental with that movie doesnt exists');
  }
});
router.get('/customer/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const rental = await Rental.find({ 'customer._id': req.params.id });
    res.send(rental);
  } catch {
    return res.status(404).send('The rental with that movie doesnt exists');
  }
});

module.exports = router;
