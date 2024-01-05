const OnboardController = require('../controllers/onboard');
const express = require('express');
const router = express.Router();
router.post('/add-answers', OnboardController.getAddOnboard);
router.put('/update-answers/:onboardId',OnboardController.getUpdateOnboard);
router.get('/getOnboards', OnboardController.getOnboards);
router.delete('/delete-onboard/:onboardId', OnboardController.deleteOnboards);
module.exports=router;