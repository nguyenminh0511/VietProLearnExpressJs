const mongoose = require('./index.js');

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        default: null
    },
    room_id: {
        type: mongoose.Types.ObjectId,
        ref: 'rooms'
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true,
    collection: 'messages'
})

const MessageModel = mongoose.model('messages', messageSchema);
module.exports = MessageModel;