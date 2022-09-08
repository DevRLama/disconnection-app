const mongoose = require('mongoose');

const disconnectionSchema = mongoose.Schema({
    accountId:{
        type:String,
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
    },
    feederCode:{
        type:String
    },
    AssignedTo: { 
        type: String
    },
    AssignedBy: {
        type: String
    },
    AssignedDate: {
        type: String
    },
    CompletionDate: {
        type: Date
    },
    Remark:{
        type: String
    }

});


module.exports = mongoose.model('Disconnection',disconnectionSchema);