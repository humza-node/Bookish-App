const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OnboardSchema = new Schema(
    {
        answer1:
        {
           type: String,
           required: true
        },
        answer2:
        {
            type: String,
            required: true
        },
        answer3:
        {
            type: String,
            required: true
        },
        answer4:
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
module.exports = mongoose.model("Onboard", OnboardSchema);