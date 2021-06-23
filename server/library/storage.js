const multer  = require('multer');
const path = require('path');

const generateName = (time, ext) => {
    const extension = ext.split('/')[1];
    return `${time}-beno-${Date.now()}.jpeg`
}

const storage = multer.diskStorage({ 
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/')); //! __dirname is current directory
  },
  filename: (req, file, callback) => {
    callback(null, generateName(req.query.uploadTime, file.mimetype))
  }
});

module.exports = storage;