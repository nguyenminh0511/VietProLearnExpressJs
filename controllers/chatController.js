const path = require("path");
const UserModel = require('../models/users');
const RoomModel = require('../models/rooms');

const getChat = async (req, res, next) => {
    try {
        let userId = req.userId;
        let users = UserModel.find({
            _id: { $nin: [userId] }
        });
        let rooms = RoomModel.find({
            users: { $all: [userId] }
        }).populate('users');
        let userData = await users;
        let roomData = await rooms;
        res.render(path.join(__dirname, '../views/chat.ejs'), {
            rooms: roomData,
            users: userData,
            userID: req.userId
        });
    } catch(err) {
        console.log(err);
        res.status(500).json("Server error!");
    }
}

module.exports = {
    getChat
}