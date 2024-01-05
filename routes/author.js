const AuthorController = require('../controllers/authors');
const express = require('express');
const router = express.Router();
router.post('/add-author', AuthorController.getAddAuthor);
router.put('/update-author/:authorId', AuthorController.updateAuthors);
router.get('/getAuthors', AuthorController.getAuthors);
router.delete('/deleteAuthors/:authorId', AuthorController.getDeleteAuthor);
router.get('/getSingleAuthor/:authorId', AuthorController.getSingleAuthor);
module.exports=router;