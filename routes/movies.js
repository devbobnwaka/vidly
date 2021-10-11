const auth = require('../middleware/auth');
const {Movie, GenreMovie, validate, createMovie} = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res)=>{
    try{
        const value = await validate(req.body.title, req.body.numberInStock, req.body.dailyRentalRate, req.body.genreName);

        const result = await createMovie(req.body.title, req.body.numberInStock, req.body.dailyRentalRate, new GenreMovie({name: req.body.genreName}));
        // console.log(result);
        res.status(200).send(result); 
    } catch(err){
        res.status(400).send('An error occured '+ err);
    }
});

module.exports = router;
