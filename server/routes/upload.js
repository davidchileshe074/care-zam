const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'zamcare_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private (usually for admins/volunteers)
router.post('/', protect, authorize('admin', 'volunteer'), upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    res.status(200).json({
        success: true,
        data: {
            imageUrl: req.file.path
        }
    });
});

module.exports = router;
