const mongoose = require('mongoose');
<<<<<<< HEAD

=======
>>>>>>> 3cf44914ed68a387801daa53fc280d9da080883c

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