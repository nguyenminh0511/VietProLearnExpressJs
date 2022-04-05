const UserModel = require('../models/users');
const checkAdmin = async (req, res, next) => {
    let id = req.userId;
    let user = await UserModel.findOne({_id: id});
    if (user.role == 'admin') {
        next();
    } else {
        res.json("NOT PERMITTION");
    }
}

module.exports = {
    checkAdmin
}