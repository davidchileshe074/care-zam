const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Task = require('../models/Task');
const Volunteer = require('../models/Volunteer');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find().populate('assignedVolunteers', 'name email');
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
exports.getTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id).populate('assignedVolunteers', 'name email');
    if (!task) {
        return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: task });
});

// @desc    Create task
// @route   POST /api/tasks
// @access  Private/Admin
exports.createTask = asyncHandler(async (req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
exports.updateTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: task });
});

// @desc    Assign volunteer to task
// @route   POST /api/tasks/:id/assign
// @access  Private/Admin
exports.assignVolunteer = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    const volunteer = await Volunteer.findById(req.body.volunteerId);

    if (!task || !volunteer) {
        return next(new ErrorResponse('Task or Volunteer not found', 404));
    }

    // Add volunteer to task
    if (!task.assignedVolunteers.includes(volunteer._id)) {
        task.assignedVolunteers.push(volunteer._id);
        await task.save();
    }

    // Add task to volunteer
    if (!volunteer.assignedTasks.includes(task._id)) {
        volunteer.assignedTasks.push(task._id);
        volunteer.status = 'Active';
        await volunteer.save();
    }

    res.status(200).json({ success: true, data: task });
});
