const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: String,
    company: String,
    amount: Number,
    frequency: {
        type: String,
        enum: ['one-time', 'monthly', 'annually'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
