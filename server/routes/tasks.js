const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    assignVolunteer
} = require('../controllers/tasks');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getTasks)
    .post(protect, createTask);

router.route('/:id')
    .get(getTask)
    .put(protect, updateTask);

router.route('/:id/assign')
    .post(protect, assignVolunteer);

module.exports = router;
