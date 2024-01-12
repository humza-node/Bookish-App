const Author = require('../models/authors');
const filehelper = require('../util/file');
exports.getAddAuthor = async(req, res, next) =>
{
const image = req.file.path.replace("\\","/");
const authorname = req.body.authorname;
const authortype = req.body.authortype;
const penName = req.body.penName;
const rating = req.body.rating;
const totalBooks = req.body.totalBooks;
const aboutauthor = req.body.aboutauthor;
const baseUrl = 'https://pink-angry-beetle.cyclic.app';
const absoluteImageUrl = `${baseUrl}/${image}`;
const authors = new Author(
    {
        authorImage: absoluteImageUrl,
        authorname: authorname,
        authortype: authortype,
        penName: penName,
        rating: rating,
        totalBooks: totalBooks,
        aboutauthor: aboutauthor
    }
);
const results = await authors.save();
res.status(200).json({message: "Author Added ", results });
};
exports.updateAuthors = async(req, res, next) =>
{
    const authorId = req.params.authorId;
    const image = req.file.path.replace("\\","/");
    const authorname = req.body.authorname;
    const authortype = req.body.authortype;
    const penName = req.body.penName;
    const rating = req.body.rating;
    const totalBooks = req.body.totalBooks;
    const aboutauthor = req.body.aboutauthor;
    const baseUrl = 'https://pink-angry-beetle.cyclic.app';
const absoluteImageUrl = `${baseUrl}/${image}`;
    Author.findById(authorId).then(authors =>
        {
            if(!authors)
            {
                const error = new Error("Author Not Found");
                error.statusCode = 404;
                throw error;
            }
            authors.authorname=authorname;
            authors.authortype=authortype;
            authors.penName = penName;
            authors.rating = rating;
            authors.totalBooks = totalBooks;
            authors.aboutauthor = aboutauthor;
            if(image)
            {
                filehelper.deletefile(authors.authorImage);
                authors.authorImage=absoluteImageUrl;
            }
            return authors.save();
        }).then(result =>
            {
                res.status(200).json({message: "Authors Update", result});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                });
};
exports.getAuthors = async(req, res, next) =>
{
const results = await Author.find();
res.status(200).json({message: "Fetch Results", results});
};
exports.getDeleteAuthor = async(req, res, next) =>
{
const authorId = req.params.authorId;
Author.findById(authorId).then(authors =>
    {
        if(!authors)
        {
            const error = new Error("Author Not Found");
            error.statusCode=404;
            throw error;
        }
        filehelper.deletefile(authors.authorImage);
        return Author.findByIdAndDelete(authorId);
    }).then(result =>
        {
            console.log(result);
           res.status(200).json({message: "Authors Deleted", result}); 
        }).catch(err =>
            {
                if(err.statusCode)
                {
                    err.statusCode=505;
                }
                next(err);
            });
};
exports.getSingleAuthor = async(req, res, next) =>
{
    const  authorId = req.params.authorId;
  const authors = await Author.findById(authorId);
  res.status(200).json({message: "Fetch Single Author", authors});
};
exports.getSearchAuthors = async(req, res, next) =>
{
    const name = req.query.name;
    const FindAuthors = await Author.find({authorname: {$regex: new RegExp(name, 'i')}});
    res.status(200).json({message: "Fetch Authors", FindAuthors});
};
