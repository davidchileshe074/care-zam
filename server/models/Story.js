const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add story content']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    child: {
        type: mongoose.Schema.ObjectId,
        ref: 'Child'
    },
    imageUrl: String,
    category: {
        type: String,
        enum: ['Education', 'Health', 'General', 'Community'],
        default: 'General'
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', StorySchema);
