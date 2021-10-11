const express = require('express');
const genres = require('../routes/genres');
const home = require('../routes/home');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/errror');


module.exports = function(app){
    //middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/genres/', genres);
    app.use('/api/customers/', customers);
    app.use('/api/movies/', movies);
    app.use('/api/rentals/', rentals);
    app.use('/api/users/', users);
    app.use('/api/auth/', auth);
    app.use('/', home);
    //Error middleware
    app.use(error);
};