
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require ('bcrypt');
const mongoose = require('mongoose');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {value, error} = await validate(req.body.email, req.body.password); 
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: value.email});
    if(!user) return res.status(400).send('Invalid email or password!!!');
     
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});


async function validate(email, password){
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .min(5).max(255)
            .required()
      }); 
      return schema.validate({email:email, password:password});
}
// tell express that any route with /api/users/ use the exported route below
module.exports = router;