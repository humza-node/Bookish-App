const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const priceSchema = new Schema(
    {
        limitOffer:
        {
            type: String,
            required: true
        },
        durationLimit:
        {
         type: String,
         required: true
        },
        description:
        {
            type: String,
            required: true
        },
        price:
        {
            type: String,
            required: true
        }
    }
);
module.exports=mongoose.model("Price", priceSchema);