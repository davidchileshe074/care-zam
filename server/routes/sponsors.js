const express = require('express');
const { getSponsors, createSponsor } = require('../controllers/sponsors');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), getSponsors)
    .post(protect, createSponsor);

module.exports = router;
