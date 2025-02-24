const mongoose = require('mongoose')
const { type } = require('os')
const { emit } = require('process')

const User = mongoose.Schema({
    FullName : {
        type : String,
        required : true
    },
    // LastName:{
    //     type : String,
    //     required : true
    // },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String,
        required : true,
        unique : true
    },
    ConfirmPassword : {
        type : String,
        required : true,
    },
    Phonenumber : {
        type : Number,
        required : true,
        unique : true
    }

})

const user = mongoose.model('user',User)

module.exports = user