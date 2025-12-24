const express = require('express');
const {
    getVolunteers,
    getVolunteer,
    createVolunteer,
    updateVolunteer,
    logHours
} = require('../controllers/volunteers');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), getVolunteers)
    .post(createVolunteer);

router.route('/:id')
    .get(protect, authorize('admin'), getVolunteer)
    .put(protect, authorize('admin'), updateVolunteer);

router.route('/:id/hours')
    .post(protect, authorize('admin'), logHours);

module.exports = router;
