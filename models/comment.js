const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
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
            ref: 'Book',
            required: true
        },
        text:
        {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports=mongoose.model('Comment', commentSchema);