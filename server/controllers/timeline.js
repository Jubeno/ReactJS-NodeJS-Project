const Timeline = require('../models/timeline');
const Photo = require('../models/photo');
const { RESPONSE_CODE, STATUS_CODE } = require('../library/constants');
const { responseJSON } = require('../library/ultilities/ultilities');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = require('../library/aws/s3/s3');
const uploadedPhotoPath = path.join(__dirname, '../uploads');

const getUploadedPhotos = async (files, time) => {
    let list = [];
    await files.forEach(file => {
        if(file.includes(time)) {
            list = [...list, file]
        }
    })
    return list;
}

const uploadPhotos = async (req, res) => {
    const time = req.query.uploadTime;
    const timelineId = req.query.timelineId;

    fs.readdir(uploadedPhotoPath, async (err, files) => {
        if(err) throw err;

        const photos = await getUploadedPhotos(files, time);

        photos.forEach(file => {
            const filePath = `${path.join(__dirname, '../uploads')}/${file}`
            fs.readFile(filePath, (err, data) => {
                if(err) throw err;

                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: `${file}`,
                    Body: data,
                    ContentType: 'image/jpeg'
                }

                // TODO: DO UPLOAD TO S3
                s3.upload(params, function(s3Err, data) {
                    if (s3Err) throw s3Err;
                    saveToDatabase(time, timelineId, data.Location);
                });
            })
        });
    })
    responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.SUCCESS, { message: "DONE!!" })
}

const saveToDatabase = async (uploadTime, timelineId, photoPath) => {
    const photo = new Photo({
        uploadTime, timelineId, photoPath
    });
    photo.save((error, result) => {
        if (error) throw error;
        else console.log(result);
    })

}

const uploadContents = async (req, res) => {
    const timeline = new Timeline(req.body);

    timeline.save((error, result) => {
        if(error) {
            responseJSON(res, STATUS_CODE.BAD_REQUEST, RESPONSE_CODE.FAILURE, error)
        }
        responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.SUCCESS, { message: "Successfully!!!" })
    })
}

module.exports = {
    uploadPhotos,
    uploadContents
}