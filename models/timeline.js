const mongoose = require('mongoose');
 
const timelineSchema = new mongoose.Schema({
    userId: String,
    title: String,
    time: String,
    note: String,
    originalTime: String,
    timelineId: String
});

module.exports = new mongoose.model('Timeline', timelineSchema, 'timeline');