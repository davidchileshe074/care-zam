const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Child = require('../models/Child');

// @desc    Get all children
// @route   GET /api/children
// @access  Public
exports.getChildren = asyncHandler(async (req, res, next) => {
    const children = await Child.find().sort('-createdAt');
    res.status(200).json({ success: true, count: children.length, data: children });
});

// @desc    Get single child
// @route   GET /api/children/:id
// @access  Public
exports.getChild = asyncHandler(async (req, res, next) => {
    const child = await Child.findById(req.params.id);

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: child });
});

// @desc    Create new child
// @route   POST /api/children
// @access  Private/Admin
exports.createChild = asyncHandler(async (req, res, next) => {
    const child = await Child.create(req.body);
    res.status(201).json({ success: true, data: child });
});

// @desc    Update child
// @route   PUT /api/children/:id
// @access  Private/Admin
exports.updateChild = asyncHandler(async (req, res, next) => {
    let child = await Child.findById(req.params.id);

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    child = await Child.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: child });
});

// @desc    Delete child
// @route   DELETE /api/children/:id
// @access  Private/Admin
exports.deleteChild = asyncHandler(async (req, res, next) => {
    const child = await Child.findById(req.params.id);

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    await child.deleteOne();

    res.status(200).json({ success: true, data: {} });
});

// @desc    Add progress report to child
// @route   POST /api/children/:id/reports
// @access  Private/Admin
exports.addProgressReport = asyncHandler(async (req, res, next) => {
    const child = await Child.findById(req.params.id);

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    req.body.author = req.user.id;
    child.progressReports.unshift(req.body);

    await child.save();

    res.status(201).json({ success: true, data: child.progressReports });
});
