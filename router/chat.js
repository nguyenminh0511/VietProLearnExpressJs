const express = require("express");
const router = express.Router();
const { getChat } = require('../controllers/chatController');

router.route('/')
    .get(getChat)

module.exports = router;