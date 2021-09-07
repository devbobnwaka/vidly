const {Customer , validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
// const { boolean } = require('joi');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // find all documents
        const customers = await Customer.find({});
        res.send(customers);
    } catch (error) {
        console.error(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const value = await validate(req.body.name, req.body.isGold, req.body.phone);
        // console.log(value);
        const customers = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });
        const customer = await customers.save();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send('An error occured '+ error);
    }
});

module.exports = router;
