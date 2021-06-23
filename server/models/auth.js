const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: ObjectId,
    nickname: {type: String, default: ""},
    fullName: {type: String, default: ""},
    birthday: {type: Date, default: Date.now},
    gender: {type: Number, default: 0},
    avatar: {type: String, default: null},
    username: {type: String, default: "", min: 6, max: 10},
    password: {type: String, default: "", min: 8}
});

module.exports = mongoose.model('User', userSchema, 'user')