const express = require('express');
const { signup, login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getMe);

module.exports = router;
