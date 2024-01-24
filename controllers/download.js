const Download = require('../models/download');
const Book = require('../models/book');
exports.addDownload = async(req,res,next) =>
{
    try
    {
    const userId = req.user._id;
    const bookId = req.body.bookId;
    const downloads = new Download(
        {
            userId: userId,
            bookId: bookId
        }
    );
    const results = await downloads.save();
    res.status(200).json({message: "Downloaded Added", results});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
        next(err);
    }
};
exports.deleteDownload = async(req, res, next) =>
{
    const downloadId = req.params.downloadId;
    Download.findById(downloadId).then(downloads =>
        {
            if(!downloads)
            {
                const error = new Error("Downloads not Founds");
                error.statusCode = 404;
                throw error;
            }
            return Download.deleteOne({_id: downloadId, userId: req.user._id});
        }).then(() =>
        {
            console.log("Delete Favorites");
            res.status(200).json({message: "Deleted Favorites"});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });
};
exports.getDownloads = async(req, res, next) =>
{
    try
    {

const downloads = await Download.find();
const books = (await (downloads)).map(download =>download.bookId);
const bookData = await Book.find({_id: { $in: books}});
const imageUrl = (await (bookData)).map(books =>books.bookImageUrl);
const title = (await (bookData)).map(books => books.booktitle);
const authorname = (await (bookData)).map(books =>books.authorName);
const rating = (await (bookData)).map(books =>books.bookrating);
const minutes = (await (bookData)).map(books =>books.mintues);
res.status(200).json({message: "Fetch Downloads", imageUrl, title, authorname, rating, minutes});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
};