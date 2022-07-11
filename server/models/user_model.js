const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Validator=require('validator');
const { Timestamp } = require('mongodb');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    firstname:{
        type:String,
        maxLength:100,
        trim:true
    },
    lastname:{
        type:String,
        maxLength:100,
        trim:true
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('User',userSchema)
module.exports={User}