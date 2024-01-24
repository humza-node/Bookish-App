const Comment = require('../models/comment');
exports.addComments = async(req, res, next) =>
{
    try
    {
    const bookId = req.body.bookId;
    const text = req.body.text;
    const userId = req.user._id;
    const comments = new Comment(
        {
            userId: userId,
            bookId: bookId,
            text: text,
        }
    );
    const results = await comments.save();
    res.status(200).json({message: "Comment Added", results});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
        next(err);
    }
};
exports.updateComments = async(req, res, next) =>
{
    const commentId = req.params.commentId;
    const bookId = req.body.bookId;
    const text = req.body.text;
    Comment.findById(commentId).then(comments =>
        {
            if(!comments)
            {
                const error = new Error("Comment Not Found");
                error.statusCode = 404;
                throw error;
            }
            comments.bookId=bookId;
            comments.text=text;
       const results = comments.save();
       return res.status(200).json({message: "Comment Edited", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });
};
exports.deleteComments = async(req, res, next) =>
{
    const commentId = req.params.commentId;
    Comment.findById(commentId).then(comments =>
        {
            if(!comments)
            {
                const error = new Error("Not Found Comments");
                error.statusCode=404;
                throw error;
            }
            return Comment.deleteOne({_id: commentId, userId: req.user._id});
        }).then(()=>
        {
            console.log("Deleted Favorites");
            res.status(200).json({message: "Success"});
        }).catch(err =>
            {
                res.status(200).json({message: "Favorites Deleted Failed"});
                next(err);
            });
};
exports.getComments = async(req, res, next) =>
{
    try
    {
    const comments = await Comment.find();
    res.status(200).json({message: "Fetch Comments", comments});
    }
    catch(error)
    {
        console.error(error);
        console.log(error);
        next(error);
    }
};
