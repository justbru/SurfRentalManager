/**
 * model.js
 * This class creates a model for the Mongoose object to use when
 *  creating data for a database entry
 */

const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    email: {
        type:String, 
        required: true,
        unique:true
    },
    phone_number: {
        type:String, 
        required: true,
        unique: true
    },
    board_ID: {
        type:String, 
        required: true
    },
    time_out: {
        type:String, 
        required: true
    },
    time_in: String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
