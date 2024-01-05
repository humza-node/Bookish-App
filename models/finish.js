const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const finishSchema = new Schema(
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
        finishDate:
        {
            type: Date,
            default: Date.now
        },
    }
);
module.exports = mongoose.model("Finish", finishSchema);