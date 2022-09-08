const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: { 
        type: String,
        require: true
    },
    firstName: { 
        type: String,
        require:true
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        require:true
    },
    otp:{
        type:String,
    },
    supervisorID:{
        type:String,
       
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('User', userSchema);