const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/', home);

//Connect to the database
async function connectdb(){
    try {
        await mongoose.connect('mongodb://localhost:27017/vidly');
        console.log('Connected to the database!!!');
      } catch (error) {
        // handleError(error);
        console.error(error);
      }
}
//call the connectiondb function
connectdb();

const port = process.env.PORT || 3000;

// const genre = genres.find(el => console.log(el.id));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
