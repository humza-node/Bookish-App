const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personalSchema = new Schema(
    {
        userImage:
        {
            type:String,
            required: true
        },
        fullname:
        {
            type: String,
            required: true
        },
        phone:
        {
            type: Number,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
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
module.exports = mongoose.model('Personal', personalSchema);