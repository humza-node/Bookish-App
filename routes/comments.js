const CommentController = require('../controllers/comment');
const express = require('express');
const router = express.Router();

router.post('/add-comment', CommentController.addComments);
router.put('/update-comment/:commentId', CommentController.updateComments);
router.delete('/delete-comments/:commentId', CommentController.deleteComments);
router.get('/get-comments', CommentController.getComments);
module.exports=router;
