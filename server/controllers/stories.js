const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Story = require('../models/Story');

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
exports.getStories = asyncHandler(async (req, res, next) => {
    const stories = await Story.find({ isPublished: true })
        .populate('child', 'name photoUrl')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        count: stories.length,
        data: stories
    });
});

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
exports.getStory = asyncHandler(async (req, res, next) => {
    const story = await Story.findById(req.params.id).populate('child', 'name photoUrl');

    if (!story) {
        return next(new ErrorResponse(`Story not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: story
    });
});

// @desc    Create new story
// @route   POST /api/stories
// @access  Private/Admin
exports.createStory = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.author = req.user.id;

    const story = await Story.create(req.body);

    res.status(201).json({
        success: true,
        data: story
    });
});

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private/Admin
exports.updateStory = asyncHandler(async (req, res, next) => {
    let story = await Story.findById(req.params.id);

    if (!story) {
        return next(new ErrorResponse(`Story not found with id of ${req.params.id}`, 404));
    }

    story = await Story.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: story
    });
});

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private/Admin
exports.deleteStory = asyncHandler(async (req, res, next) => {
    const story = await Story.findById(req.params.id);

    if (!story) {
        return next(new ErrorResponse(`Story not found with id of ${req.params.id}`, 404));
    }

    await story.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
