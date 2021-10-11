const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        require: true,
        minlength: 3,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

async function validateUser(name, email, password){
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .min(5).max(255)
            .required()
        // password: Joi.string()
        //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        // repeat_password: Joi.ref('password')
      });
    //   .with('password', 'repeat_password');
    
      return schema.validate({name: name, email:email, password:password});
}

exports.User = User;
exports.validate = validateUser;