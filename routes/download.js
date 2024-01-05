const downloadControll = require('../controllers/download');
const express=require('express');
const router = express.Router();
router.post('/add-downloads', downloadControll.addDownload);
router.delete('/delete-downloads/:downloadId',downloadControll.deleteDownload);
router.get('/get-downloads',downloadControll.getDownloads);
module.exports=router;