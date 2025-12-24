const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    message: String,
    phone: String,
    skills: [String],
    availability: String,
    interests: [String],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Active', 'Inactive'],
        default: 'Pending'
    },
    assignedTasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Task'
        }
    ],
    totalHours: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
