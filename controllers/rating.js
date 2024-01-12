const Rating = require('../models/rating');
exports.addRating = async(req, res, next) =>
{
    try
    {
    const bookId = req.body.bookId;
    const userId = req.user._id;
    const reviewText = req.body.reviewText;
    const rating = req.body.rating;
    const ratings = new Rating(
        {
            bookId: bookId,
            userId: userId,
            reviews: reviewText,
            rating: rating
        }
    );
    const results = await ratings.save();
    res.status(200).json({message: "Reviews Added",results});
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
};