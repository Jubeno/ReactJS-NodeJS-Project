const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({ 
    url: process.env.MONGO_URI ,
    options: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    file: (req, file) => {
        const userId = req.query.userId;
        const timelineId = req.query.timelineId;
        const match = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    
        if (match.indexOf(file.mimetype) === -1) {
          const filename = `${Date.now()}-beno-${file.originalname}`;
          return filename;
        }

        return {
          bucketName: "photos",
          filename: `${Date.now()}-beno-${file.originalname}`,
          id: `${Date.now()}/${userId}/${timelineId}`
        };
    }
});

module.exports = storage;