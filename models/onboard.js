const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OnboardSchema = new Schema(
    {
        selectedOptions1: [
            {
              type: String,
              enum: ['Be happy', 'Motivation', 'Working Habits', 'Increase Productivity', 'Maintain Health'],
              required: true
            },
          ],
         selectedOptions2: [
            {
                type: String,
                enum: ['Replace Social Media', 'Develop the reading habit', 'Information Overload','Personal Growth'],
                required: true
            }
         ],
         selectedOptions3:
         [
            {
                type: String,
                enum: ['Be happy', 'Motivation', 'Working Habits', 'Increase Productivity', 'Maintain Health'],
                required: true
            }
         ],
         selectedOptions4:
         [
            {
                type: String,
                enum: ['Replace Social Media', 'Develop the reading habit', 'Information Overload', 'Personal Growth'],
                required: true
            }
         ],
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);
module.exports = mongoose.model("Onboard", OnboardSchema);