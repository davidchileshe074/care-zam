const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a task title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    location: String,
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    duration: String, // e.g., "3 hours"
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    assignedVolunteers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Volunteer'
        }
    ],
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Open'
    },
    category: {
        type: String,
        enum: ['Education', 'Maintenance', 'Medical', 'Fundraising', 'General'],
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
