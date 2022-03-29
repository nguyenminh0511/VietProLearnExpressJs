const mongoose = require('./index');

const commentSchema = new mongoose.Schema({
    email: String,
    prd_id: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    },
    body: String,
    full_name: String,
}, {
    collection: 'comments'
})

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;
