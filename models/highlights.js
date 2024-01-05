const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const highlightSchema = new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        bookId:
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        },
        selectedText:
        {
            type: String,
            required: true
        }
    }
);
module.exports = mongoose.model("Highlight", highlightSchema);