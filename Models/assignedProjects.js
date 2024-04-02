const mongoose = require('mongoose');

const assignedProjectSchema = new mongoose.Schema({
    projectId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    employeeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['active', 'blocked', 'completed'],
        default: 'active'
    }
});

const AssignedProject = mongoose.model('AssignedProject', assignedProjectSchema);

module.exports = AssignedProject;
