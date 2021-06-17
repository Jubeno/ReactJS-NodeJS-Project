const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { uploadPhotos, uploadContents } = require('../controllers/timeline');
const { UPLOAD_PHOTOS, UPLOAD_CONTENTS } = require('../library/constants');
const multer  = require('multer');
const storage = require('../library/storage');

const upload = multer({ storage });


router.post(UPLOAD_PHOTOS, upload.array('files', 4), uploadPhotos);

router.post(UPLOAD_CONTENTS, uploadContents);



module.exports = router;