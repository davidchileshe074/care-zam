const express = require('express');
const {
    getDonations,
    createDonation,
    getDonationStats
} = require('../controllers/donations');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', getDonationStats);

router
    .route('/')
    .get(protect, getDonations)
    .post(protect, createDonation);

module.exports = router;
