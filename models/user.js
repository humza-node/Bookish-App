const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema (
    {
        email:
        {
            type: String,
            unique: true,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        otp: String,
        resetToken: String,
        resetTokenExpiration: Date
    },
    {
        timestamps: true
    }
);
module.exports=mongoose.model("User", userSchema);