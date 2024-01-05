const BookControll = require('../controllers/book');
const express = require('express');
const router = express.Router();
router.post('/add-book', BookControll.getAddBook);
router.get('/get-books', BookControll.getBooks);
router.put('/update-books/:bookId', BookControll.updateBooks);
router.delete('/delete-books/:bookId', BookControll.deleteBooks);
router.get('/trending-books',BookControll.getTrending);
router.get('/all-books', BookControll.getAll);
router.get('/for-you', BookControll.getforyou);
router.get('/latest-summary', BookControll.getLatestSummary);
router.get('/get-stories', BookControll.getCategoryStories);
router.get('/get-religious', BookControll.getCategoryReligious);
router.get('/get-love', BookControll.getCategoryLove);
router.get('/get-Literature',BookControll.getCategoryLiterature);
router.get('/get-reference', BookControll.getReferenceBook);
router.get('/get-Inspires', BookControll.getInspireBook);
router.get('/get-technicals', BookControll.getTechnicalBooks);
router.get('/get-science', BookControll.getScienceBooks);
router.get('/get-romance', BookControll.getRomanceBooks);
router.get('/get-poetry', BookControll.getPoetryBooks);
router.get('/get-adventure', BookControll.getAdventureBooks);
router.get('/get-searchBook', BookControll.getSearch);
module.exports = router;