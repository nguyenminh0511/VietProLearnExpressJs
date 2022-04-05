const mongoose = require("./index");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    type: {
        type: String,
        enum: ["private", "group"],
        default: "private"
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }]
}, {
    timestamps: true,
    collection: 'rooms'
})

const RoomModel = mongoose.model('rooms', RoomSchema);
module.exports = RoomModel;