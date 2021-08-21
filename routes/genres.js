const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
    {id:1, movie: 'Jackie Chan',genre: 'Action'},
    {id:2, movie: 'Harry potter', genre: 'Adventure'},
    {id:3, movie: 'Mr Bean', genre: 'Comedy'},
    {id:4, movie: 'Choli Soccer', genre: 'Fantasy'},
    {id:5, movie: 'Vampire Diary', genre: 'Horror'}
];

function validateInput(movie, genre){
    const schema = Joi.object({
        movie: Joi.string().min(3).max(30).required(),
        genre: Joi.string().min(3).max(30).required()
    });

    return schema.validate({ movie: movie, genre: genre });
}

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');
    res.send(genre);
});

router.post('/', (req, res) => {
    const {error, value} = validateInput(req.body.movie, req.body.genre);
    if(error) return res.status(400).send('Fill the fields correctly');
    // console.log(error.details[0].message);
    
    //creating the new post
    const genre = {
        id: genres.length +1,
        movie: req.body.movie,
        genre: req.body.genre
    };

    //push the new post to the genre array
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');

    const {error, value} = validateInput(req.body.movie, req.body.genre);
    if(error) return res.status(400).send(error);

    genre.movie = req.body.movie;
    genre.genre = req.body.genre;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genres);
});

module.exports = router;