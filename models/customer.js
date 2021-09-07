const mongoose = require('mongoose');
const Joi = require('joi');

function customerValidation(name, isGold, phone) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean(),
      phone: Joi.string().min(5).max(50).required()
    });
    return schema.validate({name, isGold, phone});
  }


//create a schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

//Compile Schema in a model
const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = customerValidation;