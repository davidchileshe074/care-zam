const express = require('express');
const {
    getChildren,
    getChild,
    createChild,
    updateChild,
    deleteChild,
    addProgressReport
} = require('../controllers/children');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getChildren)
    .post(protect, authorize('admin', 'volunteer'), createChild);

router
    .route('/:id')
    .get(getChild)
    .put(protect, authorize('admin', 'volunteer'), updateChild)
    .delete(protect, authorize('admin'), deleteChild);

router
    .route('/:id/reports')
    .post(protect, authorize('admin', 'volunteer'), addProgressReport);

module.exports = router;
