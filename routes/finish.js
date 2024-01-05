const finishControll = require('../controllers/finish');
const express= require('express');
const router = express.Router();
router.post('/add-finish', finishControll.addFinish);
router.delete('/delete-finish/:finishId',finishControll.deleteFinish);
router.get('/get-finish', finishControll.getFinish);
module.exports = router;