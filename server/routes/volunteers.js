const express = require('express');
const {
    getVolunteers,
    getVolunteer,
    createVolunteer,
    updateVolunteer,
    logHours
} = require('../controllers/volunteers');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getVolunteers)
    .post(createVolunteer);

router.route('/:id')
    .get(protect, getVolunteer)
    .put(protect, updateVolunteer);

router.route('/:id/hours')
    .post(protect, logHours);

module.exports = router;
