const CardsController = require('../controllers/cards');
const express = require('express');
const router = express.Router();
router.post('/add-card', CardsController.getAddCards);
router.put('/update-card/:cardId', CardsController.UpdateCard);
router.delete('/delete-card/:cardId', CardsController.deleteCards);
router.get('/get-cards',CardsController.getCards);
module.exports = router;