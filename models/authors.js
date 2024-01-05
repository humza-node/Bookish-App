const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema(
    {
        authorImage:
        {
        type: String,
        required: true
        },
        authorname:
        {
            type: String,
            required: true
        },
        authortype:
        {
            type: String,
            required: true
        },
        penName:
        {
            type: String,
            required: true
        },
        rating:
        {
            type: Number,
            required: true
        },
        totalBooks:
        {
            type: Number,
            required: true
        },
        aboutauthor:
        {
            type: String,
            required: true
        }
    }
);
module.exports = mongoose.model("Author", authorSchema);