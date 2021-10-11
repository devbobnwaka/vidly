const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validateInput} = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

async function createGenre(movie, genre){
    //create an object based on the class
    const genres = new Genre({
        movie: movie,
        genre: genre
    });
    
    //save to database
    try {
        // await course.validate();
        const result = await genres.save();
        // console.log(result);
    } catch (ex) {
        // console.log(ex.message);
        for (let field in ex.errors)
            res.send(ex.errors[field].properties.message);
    }
}

// async function getAllGenre(){
//     try {
//         // find all documents
//         const genres = await Genre.find({});
//         res.send(genres);
//     } catch (error) {
//         console.error(error);
//     }
// }

async function getAllGenreById(id){
    try {
        // Find the adventure with the given `id`, or `null` if not found
        const genres = await Genre.findById(id).exec();
        res.send(genres);
    } catch (error) {
        res.status(404).send('The movie genre is not found!!!');
    }
}

// const genres = [
//     {id:1, movie: 'Jackie Chan',genre: 'Action'},
//     {id:2, movie: 'Harry potter', genre: 'Adventure'},
//     {id:3, movie: 'Mr Bean', genre: 'Comedy'},
//     {id:4, movie: 'Choli Soccer', genre: 'Fantasy'},
//     {id:5, movie: 'Vampire Diary', genre: 'Horror'}
// ];

router.get('/', async (req, res) => {
        // throw new Error('Could not get the genre!!!');
        const genres = await Genre.find({}).select('movie genre');
        res.send(genres);
});

router.get('/:id', (req, res) => {
    
    getAllGenreById(req.params.id);
    // const genre = genres.find(el => el.id === parseInt(req.params.id));
    // if(!genre) return res.status(404).send('The movie genre is not found');
    // res.send(genre);
});


router.post('/', auth, (req, res) => {
        const {error, value} = validateInput(req.body.movie, req.body.genre);
        if(error) return res.status(400).send('Fill the fields correctly');
        // console.log(error.details[0].message);
        
        //creating the new post
        const genre = {
            // id: genres.length +1,
            movie: req.body.movie,
            genre: req.body.genre
        };
    
        createGenre(genre.movie, genre.genre);
        //push the new post to the genre array
        // genres.push(genre);
        res.send('Sucessfully added!!!');
});

router.put('/:id', (req, res) => {
    // Genre.findByIdAndUpdate(req.params.id, {na})

    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');

    const {error, value} = validateInput(req.body.movie, req.body.genre);
    if(error) return res.status(400).send(error);

    genre.movie = req.body.movie;
    genre.genre = req.body.genre;

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    // const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;