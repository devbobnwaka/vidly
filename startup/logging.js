const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    //handling uncaught error
    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT ERROR');
        // winston.error(ex.message, ex);
        process.exit(1);
    });
    
    
    //handling rejected promise
    process.on('unhadledRejection', (ex) => {
        console.log('WE GOT AN UNhandled rejection');
        // winston.error(ex.message, ex);
        process.exit(1);
    });

    //testing uncaught error
    // throw new Error('Something failed during startup');

    //catching errors in express
    // winston.add(winston.transports.File, {filename: "logfile.log"});
    // winston.add(winston.transports.MongoDB, {db: "mongodb://localhost/vidly",level:'info'});
};