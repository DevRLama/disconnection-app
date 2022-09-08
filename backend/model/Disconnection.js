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
    },
    feederCode:{
        type:String
    },
    AssignedTo: { 
        type: String,
        require:true
    },
    AssignedBy: {
        type: String,
        require:true
    },
    AssignedDate: {
        type: Date,
        require:true
    },
    CompletionDate: {
        type: Date
    },
    Remark:{
        type: String
    }

});


module.exports = mongoose.model('Disconnection',disconnectionSchema);