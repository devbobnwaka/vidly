const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');
const Fawn = require('fawn');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/api/movies/', movies);
app.use('/api/rentals/', rentals);
app.use('/', home);

//Connect to the database
async function connectdb(){
    try {
        await mongoose.connect('mongodb://localhost:27017/vidly');
        Fawn.init(mongoose.connections[0]._connectionString);
        // console.log(val.connections[0]._connectionString);
        console.log('Connected to the database!!!');

      } catch (error) {
        // handleError(error);
        console.error(error);
      }
}
//call the connectiondb function
connectdb();
        console.log(mongoose.connections[0]._connectionString);

const port = process.env.PORT || 3000;

// const genre = genres.find(el => console.log(el.id));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
