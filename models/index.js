const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/vp_shop_project');

module.exports = mongoose;