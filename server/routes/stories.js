const express = require('express');
const {
    getStories,
    getStory,
    createStory,
    updateStory,
    deleteStory
} = require('../controllers/stories');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getStories)
    .post(protect, createStory);

router
    .route('/:id')
    .get(getStory)
    .put(protect, updateStory)
    .delete(protect, deleteStory);

module.exports = router;
