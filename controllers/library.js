const Favorite = require('../models/favorites');
const Bookmark = require('../models/bookmark');
const Highlights = require('../models/highlights');
const finish = require('../models/finish');
const Downloads = require('../models/download');
const Book = require('../models/book');
exports.getFavCount = async(req, res, next) =>
{
    const counts = await Favorite.countDocuments();
    res.status(200).json({message: "Counts", counts});
};
exports.getBookmarkCount = async(req, res, next) =>
{
    const booksmarks = await Bookmark.countDocuments();
    res.status(200).json({message: "Counts", booksmarks});
};
exports.getHighLights = async(req, res, next) =>
{
    const highcounts = await Highlights.countDocuments();
    res.status(200).json({message: "Highlights Counts", highcounts});
};
exports.getFinish = async(req, res, next) =>
{
    const finishCounts = await finish.countDocuments();
    res.status(200).json({message:"Finish Count", finishCounts});
};
exports.getDownloads = async(req, res, next)=>
{
    const downloads = await Downloads.countDocuments();
    res.status(200).json({message: "Downloads ", downloads});
};
exports.getPlaylist = async(req, res, next) =>
{
    const playlist = await Book.countDocuments();
    res.status(200).json({message: "Play List", playlist});
};
