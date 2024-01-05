const Book = require('../models/book');
const filehelper = require('../util/file');
exports.getAddBook = async(req, res, next) =>
{
const booktitle = req.body.booktitle;
const bookUserViewtype = req.body.bookUserViewtype;
const authorName = req.body.authorName;
const bookrating = req.body.bookrating;
const image = req.file ? req.file.path.replace("\\", "/") : null;
const bookCategory = req.body.bookCategory;
const aboutthisBook = req.body.aboutthisBook;
const bookSummary = req.body.bookSummary;
const keypoints = req.body.keypoints;
const abstract = req.body.abstract;
const mintues = req.body.mintues;
const bookAudioUrl = req.body.bookAudioUrl;
const bookUrl = req.body.bookUrl;
const authorId = req.body.authorId;
const books = new Book(
    {
booktitle: booktitle,
bookUserViewtype: bookUserViewtype,
authorName: authorName,
bookrating: bookrating,
bookImageUrl: image,
bookCategory: bookCategory,
aboutthisBook: aboutthisBook,
bookSummary: bookSummary,
keypoints: keypoints,
abstract: abstract,
mintues: mintues,
bookAudioUrl: bookAudioUrl,
bookUrl: bookUrl,
authorId:authorId
    }
);
const results = await books.save();
res.status(200).json({message: "Book Saved", results});
};
exports.getBooks = async(req, res, next) =>
{
    const Books = await Book.find();
    res.status(200).json({message: "Returned Books", Books});
};
exports.updateBooks = async(req, res, next) =>
{
    const bookId = req.params.bookId;
    const booktitle = req.body.booktitle;
    const bookUserViewtype = req.body.bookUserViewtype;
    const authorName = req.body.authorName;
    const bookrating = req.body.bookrating;
    const image = req.file.path.replace("\\","/");
    const bookCategory = req.body.bookCategory;
    const aboutthisBook = req.body.aboutthisBook;
    const bookSummary = req.body.bookSummary;
    const keypoints = req.body.keypoints;
    const abstract = req.body.abstract;
    const mintues = req.body.mintues;
    const bookAudioUrl = req.body.bookAudioUrl;
    const bookUrl = req.body.bookUrl;
    const authorId = req.body.authorId;
Book.findById(bookId).then(books =>
    {
        if(!books)
        {
            const error = new Error("Not Found Books");
            error.statusCode = 404;
            throw error;
        }
        books.booktitle = booktitle;
        books.bookUserViewtype = bookUserViewtype;
        books.authorName = authorName;
        books.bookrating = bookrating;
        books.bookCategory = bookCategory;
        books.aboutthisBook = aboutthisBook;
        books.bookSummary = bookSummary;
        books.keypoints = keypoints;
        books.abstract = abstract;
        books.mintues = mintues;
        books.bookAudioUrl = bookAudioUrl;
        books.bookUrl=bookUrl;
        books.authorId = authorId;
        if(image)
        {
            filehelper.deletefile(books.bookImageUrl);
            books.bookImageUrl = image;
        }
           return  books.save();
    }).then(result =>
        {
            res.status(200).json({message: "Bookish Update", result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.deleteBooks = async(req, res, next) =>
{
    const bookId = req.params.bookId;
    Book.findById(bookId).then(books =>
        {
            if(!books)
            {
                const error = new Error("Books Not Found");
                error.statusCode=404;
                throw error;
            }
            filehelper.deletefile(books.bookImageUrl);
            return Book.findByIdAndDelete(bookId);
        }).then(result =>
            {
               console.log(result);
               res.status(200).json({message: "Book Deleted", result}); 
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=505;
                    }
                    next(err);
                });
};
exports.getTrending = async(req, res, next) =>
{
    const trendingBooks = await Book.find({bookUserViewtype: 'trending'});
    res.status(200).json({message: "Fetch Books", trendingBooks});
};
exports.getAll = async(req, res, next) =>
{
    const allBooks = await Book.find({bookUserViewtype: 'All'});
    res.status(200).json({message: "Fetch Books", allBooks});
};
exports.getforyou = async(req, res, next) =>
{
    const foryoubooks = await Book.find({bookUserViewtype: 'foryou'});
    res.status(200).json({message: "Fetch Books", foryoubooks});
};
exports.getLatestSummary = async(req, res, next) =>
{
    const latestBooks = await Book.find({bookUserViewtype: 'latestSummary'});
    res.status(200).json({message: "Latest Books", latestBooks});
};
exports.getCategoryStories = async(req, res, next) =>
{
const stories = await Book.find({bookCategory: 'Stories'});
res.status(200).json({message: "Fetch Book Stories", stories});
};
exports.getCategoryReligious = async(req, res, next) =>
{
    const religious = await Book.find({bookCategory: 'Religious'});
    res.status(200).json({message: "Fetch Book Stories", religious});
};
exports.getCategoryLove = async(req, res, next) =>
{
    const love = await Book.find({bookCategory: 'Love'});
    res.status(200).json({message: "Fetch Books Love", love});
};
exports.getCategoryLiterature = async(req, res, next) =>
{
    const Literature = await Book.find({bookCategory: 'Literature'});
    res.status(200).json({message: "Fetch Literature Books", Literature});
};
exports.getReferenceBook = async(req, res, next) =>
{
    const ReferenceBook = await Book.find({bookCategory: 'Reference'});
    res.status(200).json({message: "Fetched Reference Books", ReferenceBook});
};
exports.getInspireBook = async(req, res, next) =>
{
    const InspireBooks = await Book.find({bookCategory: 'Inspiration'});
    res.status(200).json({message: "Fetch Inspire Books", InspireBooks});
};
exports.getTechnicalBooks = async(req, res, next) =>
{
    const TechnicalBooks = await Book.find({bookCategory: 'Technical'});
    res.status(200).json({message: "Fetch Technical Books", TechnicalBooks});
    const techincal = await Book.countDocuments({bookCategory: 'Technical'});
    res.status(200).json({message: "Counts", techincal});
};
exports.getScienceBooks = async(req, res, next) =>
{
    const ScienceBooks = await Book.find({bookCategory: 'Science'});
    res.status(200).json({message: "Fetch Science Books", ScienceBooks});
    const Science = await Book.countDocuments({bookCategory: 'Science'});
    res.status(200).json({message: "Counts", Science});
};
exports.getRomanceBooks = async(req, res, next) =>
{
    const RomanceBooks = await Book.find({bookCategory: 'Romance'});
    res.status(200).json({message: "Fetch Romance Books", RomanceBooks});
    const romance = await Book.countDocuments({bookCategory: 'Romance'});
    res.status(200).json({message: "Counts", romance});
};
exports.getPoetryBooks = async(req, res, next) =>
{
    const PoetryBooks = await Book.find({bookCategory: "Poetry"});
    res.status(200).json({message: "Fetch Poetry Books", PoetryBooks});
    const Poetry = await Book.countDocuments({bookCategory: "Poetry"});
    res.status(200).json({message: "Counts", Poetry});
};
exports.getAdventureBooks = async (req, res, next) =>
{
    const AdventureBooks = await Book.find({bookCategory: 'Adventure'});
    res.status(200).json({message: "Adventure Books", AdventureBooks});
    const adventure = await Book.countDocuments({bookCategory: 'Adventure'});
    res.status(200).json({message: "Counts", adventure});
};
exports.getSearch = async(req, res, next) =>
{
    const title = req.query.title;
    const FindBooks = await Book.find({booktitle: {$regex: new RegExp(title, 'i')}});
    res.status(200).json({message: "Fetch Book", FindBooks});
};
