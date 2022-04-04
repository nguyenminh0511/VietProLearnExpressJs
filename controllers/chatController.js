const path = require("path");

const getChat = (req, res, next) => {
    res.render(path.join(__dirname, '../views/chat.ejs'), {
        rooms: [],
        users: []
    });
}

module.exports = {
    getChat
}