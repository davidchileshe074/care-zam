const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Volunteer = require('../models/Volunteer');

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private/Admin
exports.getVolunteers = asyncHandler(async (req, res, next) => {
    const volunteers = await Volunteer.find().sort('-createdAt').populate('assignedTasks', 'title date');
    res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
});

// @desc    Get single volunteer
// @route   GET /api/volunteers/:id
// @access  Private/Admin
exports.getVolunteer = asyncHandler(async (req, res, next) => {
    const volunteer = await Volunteer.findById(req.params.id).populate('assignedTasks', 'title date');
    if (!volunteer) {
        return next(new ErrorResponse(`Volunteer not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: volunteer });
});

// @desc    Create volunteer (Signup)
// @route   POST /api/volunteers
// @access  Public
exports.createVolunteer = asyncHandler(async (req, res, next) => {
    // If user is logged in, link user id
    if (req.user) {
        req.body.user = req.user.id;
    }

    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ success: true, data: volunteer });
});

// @desc    Update volunteer status/details
// @route   PUT /api/volunteers/:id
// @access  Private/Admin
exports.updateVolunteer = asyncHandler(async (req, res, next) => {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!volunteer) {
        return next(new ErrorResponse(`Volunteer not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: volunteer });
});

// @desc    Log volunteer hours
// @route   POST /api/volunteers/:id/hours
// @access  Private/Admin
exports.logHours = asyncHandler(async (req, res, next) => {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
        return next(new ErrorResponse(`Volunteer not found`, 404));
    }

    volunteer.totalHours += Number(req.body.hours);
    await volunteer.save();

    res.status(200).json({ success: true, totalHours: volunteer.totalHours });
});
