const express = require('express');
const {
    getDonations,
    createDonation,
    getDonationStats
} = require('../controllers/donations');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', getDonationStats);

router
    .route('/')
    .get(protect, authorize('admin'), getDonations)
    .post(protect, createDonation);

module.exports = router;
