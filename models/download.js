const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const downloadSchema = new Schema({
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId:
    {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    downloadDate:
    {
        type: Date,
        default: Date.now
    },
});
module.exports=mongoose.model("Download", downloadSchema);