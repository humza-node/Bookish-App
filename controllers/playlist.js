const Book = require('../models/book');
exports.getPlayList = async(req, res, next) =>
{
const playlists = await Book.find();
const title = (await (playlists)).map(book =>book.booktitle);
const image = (await (playlists)).map(book=>book.bookImageUrl);
const authorname = (await (playlists)).map(book =>book.authorName);
const rating = (await (playlists)).map(book =>book.bookrating);
const mintues = (await (playlists)).map(book =>book.mintues);
const audioUrl = (await (playlists)).map(book =>book.bookAudioUrl);
res.status(200).json({message: "Playlist Items", title, image, authorname, rating, mintues, audioUrl});
};
