const Cards = require('../models/card_details');
exports.getAddCards = async(req, res, next) =>
{
const name = req.body.name;
const cardNumber = req.body.cardNumber;
const cvv = req.body.cvv;
const expiry_date = req.body.expiry_date;
const userId = req.user._id;
const card = new Cards(
    {
        name:name,
        card_number: cardNumber,
        cvv: cvv,
        expiry_date: expiry_date,
        userId: userId
    }
);
try
{
    const results = await card.save();
    res.status(200).json({message: "Card Added", results});
}
catch(error)
{
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
}
};