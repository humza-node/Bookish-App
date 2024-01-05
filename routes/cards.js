const CardsController = require('../controllers/cards');
const express = require('express');
const router = express.Router();
router.post('/add-card', CardsController.getAddCards);
module.exports = router;