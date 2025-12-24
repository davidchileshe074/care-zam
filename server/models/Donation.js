const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    donorName: String, // Cached for public display if not anonymous
    amount: {
        type: Number,
        required: [true, 'Please add a donation amount']
    },
    currency: {
        type: String,
        default: 'ZMW'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Completed'
    },
    type: {
        type: String,
        enum: ['One-time', 'Monthly', 'Annual'],
        default: 'One-time'
    },
    category: {
        type: String,
        enum: ['General', 'Education', 'Health', 'Nutrition', 'Infrastructure'],
        default: 'General'
    },
    transactionId: {
        type: String,
        unique: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donation', DonationSchema);
