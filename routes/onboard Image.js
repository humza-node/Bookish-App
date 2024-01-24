const OnboardImageControll = require('../controllers/onboardImage');
const express = require('express');
const router = express.Router();
router.post('/add-image', OnboardImageControll.addOnboardImage);
router.get('/get-images', OnboardImageControll.getOnboardImage);
router.put('/update-image/:onboardImageId', OnboardImageControll.getUpdateImages);
router.delete('/delete-image/:onboardImageId', OnboardImageControll.deleteImage);
module.exports=router;
