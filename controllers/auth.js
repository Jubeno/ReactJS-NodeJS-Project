const User = require('../models/auth');
const { RESPONSE_CODE, STATUS_CODE } = require('../library/constants');
const { responseJSON } = require('../library/ultilities/ultilities');
const jwt = require('jsonwebtoken');

const checkExistUsername = async (username) => {
    let isValid = true;

    // if this query has an error or has one result (user) => return false
    await User.findOne({ "username": username }, (err, user) => {
        if(err !== null || user !== null) {
            isValid = false;
        }
    });

    return isValid;
}

const signUp = async function (req, res) {
    const username = req.body.username;
    const isValid = await checkExistUsername(username);
    
    if(isValid) {
        // create a new user in database
        const user = new User(req.body);

        user.save((error, result) => {
            if(error) {
                responseJSON(res, STATUS_CODE.BAD_REQUEST, RESPONSE_CODE.FAILURE, error)
            }
            responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.SUCCESS, result)
        });
    } else {
        responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.EXISTED, { message: "Username has already existed!!" })
    }
}

const signIn = async function (req, res) {
    const userInfor = req.body;
    const username = userInfor.username;
    const password = userInfor.password;

    await User.findOne(
        { 
            "username": username, 
            "password": password
        },
        (error, user) => {
            if (error) {
                responseJSON(res, STATUS_CODE.BAD_REQUEST, RESPONSE_CODE.FAILURE, error)
            };
            if (!user) {
                responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.UNKNOWN, { message: "Wrong username or password!!" })
            } else {
                const token = jwt.sign(
                    {
                        username: user.username
                    }, 
                    'secret',
                    {
                        expiresIn: '7d'
                    }
                );
                const responseForUser = { 
                    userId: user._id,
                    username: user.username,
                    token
                };
                responseJSON(res, STATUS_CODE.OK, RESPONSE_CODE.SUCCESS, responseForUser)
            };
        }
    )
}

module.exports = {
    signUp,
    signIn
}