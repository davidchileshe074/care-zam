const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    assignVolunteer
} = require('../controllers/tasks');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getTasks)
    .post(protect, authorize('admin'), createTask);

router.route('/:id')
    .get(getTask)
    .put(protect, authorize('admin'), updateTask);

router.route('/:id/assign')
    .post(protect, authorize('admin'), assignVolunteer);

module.exports = router;
