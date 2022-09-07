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
        type:String
    },

    dues:{
        type:Number,
        required:true
    },

    division:{
        type:String,
        required:true
    },

    subDivision:{
        type:String
    },

    subStation:{
        type:String
    },

    feeder:{
        type:String
    },

    billingStatus:{
        type:String
    },

    phone:{
        type:String
    },

    billBasis:{
        type:String
    },

    contractLoad:{
        type:Number
    }

});


module.exports = mongoose.model('Disconnection',disconnectionSchema);