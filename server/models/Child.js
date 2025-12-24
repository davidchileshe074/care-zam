const mongoose = require('mongoose');

const ProgressReportSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Academic', 'Health', 'Social', 'Personal'],
        default: 'Personal'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    age: {
        type: Number,
        required: [true, 'Please add an age'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unknown'],
        default: 'Unknown'
    },
    background: String,
    needs: [String],
    hobbies: [String],
    school: {
        name: String,
        grade: String,
        academicPerformance: {
            type: String,
            enum: ['Excellent', 'Good', 'Average', 'Developing'],
            default: 'Average'
        }
    },
    healthStatus: {
        type: String,
        enum: ['Excellent', 'Good', 'Stable', 'Under Care'],
        default: 'Good'
    },
    photoId: String,
    photoUrl: String,
    status: {
        type: String,
        enum: ['Available', 'Sponsored', 'Partially Sponsored'],
        default: 'Available',
    },
    sponsorshipCost: {
        type: Number,
        default: 500 // Default ZMW monthly cost
    },
    progressReports: [ProgressReportSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Child', childSchema);
