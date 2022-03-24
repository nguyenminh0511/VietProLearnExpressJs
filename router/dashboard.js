const express = require("express");
const router = express.Router();
const { count } = require('../controllers/dashboardController');

router.route('/')
    .get(count)

module.exports = router;