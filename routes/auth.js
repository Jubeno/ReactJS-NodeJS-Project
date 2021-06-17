const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { signUp, signIn } = require('../controllers/auth');
const { SIGN_IN, SIGN_UP } = require('../library/constants');
const Schema = mongoose.Schema;



router.post(SIGN_IN, signIn);

router.post(SIGN_UP, signUp);

module.exports = router;