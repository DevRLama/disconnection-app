const mongoose = require('mongoose');

const userMappingSchema = mongoose.Schema({
    
    userId: { 
        type: String,
        require:true
    },
    supervisorId: {
        type: String,
        require:true
    }
});

module.exports = mongoose.model("UserMapping", userMappingSchema);