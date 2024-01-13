const RatingControll = require('../controllers/rating');
const express = require('express');
const router = express.Router();
router.post('/add-reviews', RatingControll.addRating);
router.put('/edit-reviews/:reviewId', RatingControll.EditReviews);
router.get('/get-reviews', RatingControll.getReviews);
router.delete('/delete-reviews/:reviewId', RatingControll.deleteReview);
module.exports=router;
