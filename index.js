const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = process.env.PORT || 3000;

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
// const genre = genres.find(el => console.log(el.id));


app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.get('/api/genres/', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');
    res.send(genre);
});

app.post('/api/genres/', (req, res) => {
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

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');

    const {error, value} = validateInput(req.body.movie, req.body.genre);
    if(error) return res.status(400).send(error);

    genre.movie = req.body.movie;
    genre.genre = req.body.genre;

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The movie genre is not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genres);
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
