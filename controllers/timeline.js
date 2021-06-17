const Timeline = require('../models/timeline');
const { RESPONSE_CODE, STATUS_CODE } = require('../library/constants');
const { responseJSON } = require('../library/ultilities/ultilities');

const uploadPhotos = async (req, res) => {
    responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.SUCCESS, { message: "Successfully!!!" })
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