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
exports.EditReviews = async(req, res, next) =>
{
    try
    {
    const reviewId = req.params.reviewId;
    const bookId = req.body.bookId;
    const reviewText = req.body.reviewText;
    const rating = req.body.rating;
    Rating.findById(reviewId).then(review =>
        {
            if(!review)
            {
                const error = new Error("Reviews Not Found!");
                error.statusCode = 404;
                throw error;
            }
          review.bookId = bookId;
          review.reviews = reviewText;
          review.rating=rating;
          const results = review.save();
        res.status(200).json({message: "Review Edited", results});
        }).catch(err =>
            {
                console.log(err);
            });
        }
        catch(error)
        {
            error.statusCode=500;
            next(error);
        }
};
exports.getReviews = async(req, res, next) =>
{
    const results = await Rating.find();
    res.status(200).json({message: "Reviews and Rating", results});
};
exports.deleteReview = async(req, res, next) =>
{
  const reviewId = req.params.reviewId;
  Rating.findById(reviewId).then(ratings =>
    {
        if(!ratings)
        {
            const error = new Error("Rating Not Found");
            error.statusCode = 500;
            throw error;
        }
        return Rating.findByIdAndDelete(reviewId);   
    }).then(result =>
        {
            console.log(result);
            res.status(200).json({message: "Review Delete", result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });
};