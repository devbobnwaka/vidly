const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/genres');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres/', genres);
app.use('/', home);

const port = process.env.PORT || 3000;

// const genre = genres.find(el => console.log(el.id));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
