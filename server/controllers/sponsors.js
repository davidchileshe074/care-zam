const asyncHandler = require('../middleware/async');
const Sponsor = require('../models/Sponsor');

// @desc    Get all sponsors
// @route   GET /api/sponsors
// @access  Public
exports.getSponsors = asyncHandler(async (req, res, next) => {
    const sponsors = await Sponsor.find().sort('-createdAt');
    res.status(200).json({ success: true, count: sponsors.length, data: sponsors });
});

// @desc    Create sponsor
// @route   POST /api/sponsors
// @access  Public
exports.createSponsor = asyncHandler(async (req, res, next) => {
    const sponsor = await Sponsor.create(req.body);
    res.status(201).json({ success: true, data: sponsor });
});
