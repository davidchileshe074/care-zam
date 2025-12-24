const express = require('express');
const { getDashboardAnalytics } = require('../controllers/analytics');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', protect, authorize('admin', 'volunteer'), getDashboardAnalytics);

module.exports = router;
