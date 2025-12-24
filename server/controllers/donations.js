const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Donation = require('../models/Donation');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
exports.getDonations = asyncHandler(async (req, res, next) => {
    const donations = await Donation.find().populate({
        path: 'donor',
        select: 'name email'
    });

    res.status(200).json({
        success: true,
        count: donations.length,
        data: donations
    });
});

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.donor = req.user.id;

    // Simulated transaction ID
    req.body.transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const donation = await Donation.create(req.body);

    res.status(201).json({
        success: true,
        data: donation
    });
});

// @desc    Get donation stats
// @route   GET /api/donations/stats
// @access  Public
exports.getDonationStats = asyncHandler(async (req, res, next) => {
    const stats = await Donation.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                avgDonation: { $avg: '$amount' },
                minDonation: { $min: '$amount' },
                maxDonation: { $max: '$amount' },
                count: { $sum: 1 }
            }
        }
    ]);

    const categoryStats = await Donation.aggregate([
        {
            $group: {
                _id: '$category',
                total: { $sum: '$amount' }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: {
            overall: stats[0] || { totalAmount: 0, count: 0 },
            categories: categoryStats
        }
    });
});
