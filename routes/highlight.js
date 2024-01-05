const hightControll = require('../controllers/highlight');
const express = require('express');
const router=express.Router();
router.post('/save-highlight', hightControll.addhighLight);
router.get('/get-highlight', hightControll.getlightText);
router.put('/update-highlights/:highlightId', hightControll.updatelightText);
router.delete('/delete-highlight/:highlightId',hightControll.DeleteHighLight);
module.exports = router;
