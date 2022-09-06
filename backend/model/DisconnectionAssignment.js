const mongoose = require('mongoose');

const DisconnectionAssignmentSchema = mongoose.Schema({
    accountId: { 
        type: String,
        require: true
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

module.exports = mongoose.model("DisconnectionAssignment", DisconnectionAssignmentSchema);