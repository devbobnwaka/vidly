const mongoose = require('mongoose');
const Joi = require('joi');

//Create a schema
const genresSchema = new mongoose.Schema({
    movie: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255  
    },
    genre: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255  
    }
});

//compile the schema into a model which gives us a class
const Genre = mongoose.model('Genre', genresSchema);


function validateInput(movie, genre){
    const schema = Joi.object({
        movie: Joi.string().min(3).max(30).required(),
        genre: Joi.string().min(3).max(30).required()
    });

    return schema.validate({ movie: movie, genre: genre });
}

exports.Genre = Genre;
exports.validateInput = validateInput;