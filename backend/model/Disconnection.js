const mongoose = require('mongoose');

const disconnectionSchema = mongoose.Schema({
    accountId:{
        type:Number,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    dueAmount:{
        type:Number,
        required:true
    },

    discom:{
        type:String,
        required:true
    },

    zone:{
        type:String,
        required:true
    },

    circle:{
        type:String,
        required:true
    },

    division:{
        type:String,
        required:true
    },

    subdivision:{
        type:String,
        required:true
    },

});


module.exports = mongoose.model('Disconnection',disconnectionSchema);