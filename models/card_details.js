const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const card_schema = new Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        card_number:
        {
            type: Number,
            required: true
        },
        cvv:
        {
            type: Number,
            required: true
        },
        expiry_date:
        {
            type: Date,
            required: true
        },
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);
module.exports = mongoose.model("Cards", card_schema);