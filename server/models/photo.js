const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    uploadTime: String,
    timelineId: String,
    photoPath: String
});

module.exports = new mongoose.model('Image', imageSchema, 'photo');