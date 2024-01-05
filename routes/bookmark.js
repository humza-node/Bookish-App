const BookmarkControll = require('../controllers/bookmark');
const express = require('express');
const router = express.Router();
router.post('/add-bookmark',BookmarkControll.addBookMark);
router.put('/update-bookmark/:bookmarkId', BookmarkControll.UpdateBookmark);
router.delete('/delete-bookmark/:bookmarkId',BookmarkControll.deleteBookMark);
router.get('/get-bookmarks', BookmarkControll.getbookMarks);
module.exports=router;