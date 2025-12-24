const express = require('express');
const {
    getStories,
    getStory,
    createStory,
    updateStory,
    deleteStory
} = require('../controllers/stories');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getStories)
    .post(protect, authorize('admin', 'volunteer'), createStory);

router
    .route('/:id')
    .get(getStory)
    .put(protect, authorize('admin', 'volunteer'), updateStory)
    .delete(protect, authorize('admin'), deleteStory);

module.exports = router;
