const asyncHandler = require('../middleware/async');
const Donation = require('../models/Donation');
const Child = require('../models/Child');
const Volunteer = require('../models/Volunteer');
const Sponsor = require('../models/Sponsor');

// @desc    Get dashboard metrics and timeseries data
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
exports.getDashboardAnalytics = asyncHandler(async (req, res, next) => {
    // 1. Basic Counts
    const [childCount, donationCount, volunteerCount, sponsorCount] = await Promise.all([
        Child.countDocuments(),
        Donation.countDocuments({ status: 'Completed' }),
        Volunteer.countDocuments(),
        Sponsor.countDocuments()
    ]);

    // 2. Financial Metrics
    const financialStats = await Donation.aggregate([
        { $match: { status: 'Completed' } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$amount' },
                avgDonation: { $avg: '$amount' }
            }
        }
    ]);

    // 3. Category Breakdown
    const categoryStats = await Donation.aggregate([
        { $match: { status: 'Completed' } },
        {
            $group: {
                _id: '$category',
                total: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        }
    ]);

    // 4. Last 6 Months Revenue (Timeseries)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Donation.aggregate([
        {
            $match: {
                status: 'Completed',
                createdAt: { $gte: sixMonthsAgo }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' }
                },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
        success: true,
        data: {
            counts: {
                children: childCount,
                donations: donationCount,
                volunteers: volunteerCount,
                sponsors: sponsorCount
            },
            revenue: financialStats[0] || { totalRevenue: 0, avgDonation: 0 },
            categories: categoryStats,
            monthlyRevenue
        }
    });
});
