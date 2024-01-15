const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema(
    {
booktitle:
{
    type: String,
    required: true
},
bookUserViewtype:
{
    type: String,
    required: true
},
authorName:
{
    type:String,
    required: true
},
bookrating:
{
    type:String,
    required: true
},
bookImageUrl:
{
    type: String,
    required: true
},
bookCategory:
{
    type: String,
    required: true,
    default: null
},
aboutthisBook:
{
    type: String,
    required: true
},
bookSummary:
{
    type: String,
    required: true
},
keypoints:
{
    type: String,
    required: true,
},
abstract:
{
    type: String,
    required: true
},
mintues:
{
    type: String,
    required: true
},
bookAudioUrl:
{
    type: String,
    required: true
},
bookUrl:
{
    type: String,
    required: true
},
audioDuration:
{
    type: String,
    required: true
},
authorId:
{
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
}
    }
);
module.exports= mongoose.model("Book",bookSchema);



