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
exports.UpdateCard = async(req, res, next) =>
{
    const cardId = req.params.cardId;
    const name = req.body.name;
    const cardNumber=req.body.cardNumber;
    const cvv = req.body.cvv;
    const expiry_date=req.body.expiry_date;
Cards.findById(cardId).then(cards=>
    {
        if(!cards)
        {
            const error=new Error("Cards Not Exist");
            error.statusCode=404;
            throw error;
        }
        cards.name=name;
        cards.card_number=cardNumber;
        cards.cvv=cvv;
        cards.expiry_date=expiry_date;
        const results =  cards.save();
        return res.status(200).json({message: "Updated", results});
    }).catch(err =>
        {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        });
};
exports.deleteCards = async(req, res, next) =>
{
    const cardId = req.params.cardId;
    Cards.findById(cardId).then(cards=>
    {
        if(!cards)
        {
            const error = new Error("No Cards");
            error.statusCode=404;
            throw error;
        }
    return Cards.findByIdAndDelete(cardId);
    }).then(()=>
    {
        console.log("Cards Deleted");
        res.status(200).json({message: "Cards Deleted"});
    }).catch(err =>
        {
          res.status(200).json({message: "Cards Delete Failed"});
        });
};
exports.getCards = async(req, res, next) =>
{
    const cards = await Cards.find();
    res.status(200).json({message: "Cards Info", cards});
};
exports.getSingleCards  = async(req, res, next)=>
{
    const cardId = req.params.cardId;
    Cards.findById(cardId).then(cards =>
        {
            res.status(200).json({message: "Card Details", cards});
        }).catch(err =>
            {
                console.log(err);
            });
};