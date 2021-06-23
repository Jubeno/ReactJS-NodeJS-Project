const response = function (code = 0, data = {}) {
    return { code, data }
};

const responseJSON = function(response, statusCode, responseCode, data) {
    return response
    .status(statusCode)
    .json({ code: responseCode, data })
}

module.exports = {
    response,
    responseJSON
};