const express = require("express");
const router = express.Router();
const path = require('path');
const { authGetLogin, authPostLogin } = require('../controllers/auth');

router.route('/')
    .get(authGetLogin)
    .post(authPostLogin)

module.exports = router;