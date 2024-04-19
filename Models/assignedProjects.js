const mongoose = require("mongoose");

const assignedProjectSchema = mongoose.Schema({
   projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
   },
   employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
   },
   status: {
    type: String,
    enum: ['blocked', 'active', 'completed'],
    default: 'active'
   },
   accessType:{
    type:"String",
    enum:['read','write','none'],
    default:"read"
   }
});

const assignedProjectModel = mongoose.model('assignedProject', assignedProjectSchema);

module.exports = assignedProjectModel;
