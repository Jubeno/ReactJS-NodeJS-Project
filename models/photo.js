const mongoose = require('mongoose');
 
const imageSchema = new mongoose.Schema({
    time: String,
    note: String,
    timelineId: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
});

module.exports = new mongoose.model('Image', imageSchema);