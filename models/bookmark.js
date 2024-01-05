const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookmarkSchema = new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        bookId:
        {
            type: Schema.Types.ObjectId,
            ref:'Book',
        required: true
        }
    }
);
module.exports = mongoose.model('Bookmark', bookmarkSchema);