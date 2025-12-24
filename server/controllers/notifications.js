const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Notification = require('../models/Notification');

// @desc    Get all notifications for logged in user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({ user: req.user.id }).sort('-createdAt').limit(20);

    res.status(200).json({
        success: true,
        count: notifications.length,
        data: notifications
    });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
exports.markAsRead = asyncHandler(async (req, res, next) => {
    let notification = await Notification.findById(req.params.id);

    if (!notification) {
        return next(new ErrorResponse(`No notification with id ${req.params.id}`, 404));
    }

    // Make sure user owns notification
    if (notification.user.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: notification
    });
});

// Helper function to create notification (internal use)
exports.createNotification = async (userId, title, message, type, link) => {
    try {
        await Notification.create({
            user: userId,
            title,
            message,
            type,
            link
        });
    } catch (err) {
        console.error('Notification Error:', err);
    }
};
