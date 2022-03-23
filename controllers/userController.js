const path = require('path');
const UserModel = require('../models/users');
const paginate = require('../common/paginate');
const PAGE_SIZE = 3;

const getUsers = async (req, res, next) => {
    let page = req.query.page;
    let start = parseInt(page);
    if (start < 1) {
        start = 1;
    }
    try {
        let data = UserModel.find().skip(PAGE_SIZE * (start - 1)).limit(PAGE_SIZE);
        let totalUser = UserModel.countDocuments();
        let listUsers = await data;
        let total = await totalUser;
        if (listUsers.length > 0) {
            res.render(path.join(__dirname, '../views/user.ejs'), {
                users: listUsers,
                page: start,
                pages: paginate(start, total),
                totalPage: Math.ceil(parseInt(total) / PAGE_SIZE)
            })
        } else {
            res.json("No user data found!");
        }
    } catch(err) {
        res.status(500).json("Server error!");
    }
}

module.exports = {
    getUsers
}