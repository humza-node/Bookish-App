const RatingControll = require('../controllers/rating');
const express = require('express');
const router = express.Router();
router.post('/add-reviews', RatingControll.addRating);

module.exports=router;
