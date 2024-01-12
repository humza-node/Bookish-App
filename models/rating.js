const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        reviews: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Rating', ratingSchema);
