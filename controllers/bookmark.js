const Bookmark = require('../models/bookmark');
const Book  = require('../models/book');
const User = require('../models/user');
exports.addBookMark = async(req, res, next) =>
{
    try
    {
    const bookId = req.body.bookId;
    const userId = req.user._id;
    const bookmarks = new Bookmark(
        {
            userId: userId,
            bookId: bookId
        }
    );
    const results = await bookmarks.save();
    res.status(200).json({message: "Book Add to Bookmark", results});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
        next(err);
    }
};
exports.UpdateBookmark = async(req, res, next) =>
{
    const bookmarkId = req.params.bookmarkId;
    const bookId = req.body.bookId;
    Bookmark.findById(bookmarkId).then(bookmarks =>
        {
            if(!bookmarks)
            {
                const error = new Error('Bookmarks not found');
                error.status=404;
                throw error;
            }
            bookmarks.bookId=bookId;
            const results = bookmarks.save();
            return res.status(200).json({message: "Results", results});
        }).catch(err =>
            {
                if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
            });
};
exports.deleteBookMark = async(req, res, next) =>
{
    const bookmarkId = req.params.bookmarkId;
    Bookmark.findById(bookmarkId).then(bookmarks =>
        {
            if(!bookmarks)
            {
                const error = new Error("Books Not Found");
                error.statusCode=404;
                throw error;
            }
            return Bookmark.deleteOne({_id: bookmarkId, userId: req.user._id});
        }).then(()=>
        {
            console.log("Deleted BookMarks");
            res.status(200).json({message: "Success"});
        }).catch(err =>
            {
                res.status(200).json({message: "Bookmark Delete Failed"});
                next(err);
            });
};
exports.getbookMarks = async(req, res, next) =>
{
    try
    {
const bookmarks = await Bookmark.find();
if(!bookmarks  || bookmarks.length===0)
{
    return res.status(200).json({message: 'No favorites found'});
}   
const bookIds = bookmarks.map(bookmark => bookmark.bookId);
const userIds = bookmarks.map(bookmark =>bookmark.userId);
const books = await Book.find({_id: {$in : bookIds}});
if(!books || books.length===0)
{
    return res.status(200).json({message: "Not Matching Books Found"});
}
const users = await User.find({_id: {$in : userIds}});
if(!users || users.length ===0)
{
    return res.status(200).json({message: "Not matching Users Found"});
}
const results = books.map(book =>book.booktitle);
const userinfo = users.map(user =>user.email);
res.status(200).json({message: "Fetch ", results, userinfo});
    }
    catch(error)
    {
console.log(error);
res.status(200).json({message: "Internal Server Error"});
next(error);
    }
};
