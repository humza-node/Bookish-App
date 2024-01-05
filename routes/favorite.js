const favoriteControll = require('../controllers/favorites');
const express = require('express');
const router = express.Router();
router.post('/add-to-favorite', favoriteControll.addFavorite);
router.put('/update-favorite/:favoriteId', favoriteControll.updateFavorite);
router.delete('/delete-favorite/:favoriteId', favoriteControll.deleteFavorite);
router.get('/getFavorites', favoriteControll.getFavorites);
module.exports = router;