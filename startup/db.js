const winston = require('winston');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const config = require('config');

module.exports = function() {
    //Connect to the database
    async function connectdb(){
        try {
            const db = config.get('db');
            await mongoose.connect(db);
            Fawn.init(mongoose.connections[0]._connectionString);
            // console.log(val.connections[0]._connectionString);
            console.log(`Connected to the database!!! ...${db}`);
        } catch (error) {
            // handleError(error);
            console.error(error);
        }
    }
    //call the connectiondb function
    connectdb();
            console.log(mongoose.connections[0]._connectionString);
};