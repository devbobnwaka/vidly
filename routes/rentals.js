const {Rental, validate} = require('../models/rentals'); 
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {

      const {value, error} = await validate(req.body.customerId, req.body.movieId); 
      if(error) return res.status(400).send("Bad request!!!");
      
      const customer = await Customer.findById(value.customerId);
      if (!customer) return res.status(400).send('Invalid customer.');
    
      const movie = await Movie.findById(value.movieId);
      if (!movie) return res.status(400).send('Invalid movie.');
  
      if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  
      let rental = new Rental({ 
        customer: {
          _id: customer._id,
          name: customer.name, 
          phone: customer.phone
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      });
  
      try{
        new Fawn.Task()
                  .save('rentals', rental)
                  .update('movies', {_id: movie._id}, {
                    $inc: {numberInStock: -1}
                  })
                  .run();
        res.send(rental);
      } catch(ex){
        console.log(ex);
        res.status(500).send('Something failed.');
      }
  });
    

module.exports = router; 