const mongoose = require('mongoose');
const Joi = require('joi');

//Creating  schema  <--- IN THE FUTURE PROJECTS YOU CAN ACTUALLY USE A GENRE MODULE AND THEN EXPORT INTO THIS MODULE
const genreSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max: 255
    }
});

//Compile into a model
const GenreMovie = mongoose.model('GenreMovie', genreSchema);

const Movie = mongoose.model('Movie', movieSchema);

function validateInput(title, numberInStock, dailyRentalRate, genreName){
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        numberInStock: Joi.number().min(1).max(30).required(),
        dailyRentalRate: Joi.number().min(1).max(30).required(),
        genreName: Joi.string().min(3).max(30).required(),
    });

    return schema.validate({ title, numberInStock, dailyRentalRate, genreName});
}

async function createMovie(title, numberInStock, dailyRentalRate, genre){
    const movies = new Movie ({
        title,
        genre,
        numberInStock,
        dailyRentalRate
    });

    const result = await movies.save();
    return result;
}

exports.validate = validateInput;
exports.createMovie = createMovie;
exports.Movie = Movie;
exports.GenreMovie = GenreMovie;
