const express = require("express");
const router = express.Router();
const { getHomePage, getByCategory } = require('../controllers/siteController');

router.route('/home')
    .get(getHomePage)

router.route('/category/:id')
    .get(getByCategory)

module.exports = router;    