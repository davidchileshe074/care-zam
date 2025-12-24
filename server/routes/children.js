const express = require('express');
const {
    getChildren,
    getChild,
    createChild,
    updateChild,
    deleteChild,
    addProgressReport
} = require('../controllers/children');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getChildren)
    .post(protect, createChild);

router
    .route('/:id')
    .get(getChild)
    .put(protect, updateChild)
    .delete(protect, deleteChild);

router
    .route('/:id/reports')
    .post(protect, addProgressReport);

module.exports = router;
