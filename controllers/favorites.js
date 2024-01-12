const Favorite = require('../models/favorites');
const Book = require('../models/book');
const User = require('../models/user');
exports.addFavorite = async (req, res, next) => {
    try {
        const bookId = req.body.bookId;
        const userId = req.user._id;

        const favorite = new Favorite({
            bookId: bookId,
            userId: userId
        });

        const result = await favorite.save();
        res.status(200).json({ message: "Results", result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
        next(err);
    }
};

exports.updateFavorite = async(req, res, next) =>
{
    const favoriteId = req.params.favoriteId;
    const bookId = req.body.bookId;
    Favorite.findById(favoriteId).then(favorites =>
        {
            if(!favorites)
            {
                const error = new Error('Favorite Not Found');
                error.statusCode = 404;
                throw error;
            }
            favorites.bookId = bookId;
            const favoriteResults = favorites.save();
        return res.status(200).json({message: 'Favorite Update', favoriteResults});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.deleteFavorite = async(req, res, next) =>
{
    const favoriteId = req.params.favoriteId;
    Favorite.findById(favoriteId).then(favorite =>
        {
            if(!favorite)
            {
                const error = new Error('Favorite Not Found');
                error.statusCode=404;
                throw error;
            }
            return Favorite.deleteOne({_id: favoriteId, userId: req.user._id});
        }
        ).then(()=>
        {
            console.log('Delete Favorites');
            res.status(200).json({message: "Success"});
        }).catch(err =>
            {
                res.status(200).json({message: "Favorite Delete Failed"});
            });
};
exports.getFavorites = async(req, res, next) =>
{
    try {
        const favorites = await Favorite.find();
        
        if (!favorites || favorites.length === 0) {
          return res.status(404).json({ message: 'No favorites found' });
        }
        const bookIds = favorites.map(favorite => favorite.bookId);
        const userIds = favorites.map(favorite => favorite.userId);
      
        const books = await Book.find({ _id: { $in: bookIds } });
      
        if (!books || books.length === 0) {
          return res.status(404).json({ message: 'No matching books found' });
        }
        const users = await User.find({ _id: { $in: userIds } });
      
        if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No matching users found' });
        }
        const results = books.map(book => book.booktitle);
        const userinfo = users.map(user => user.email);
        res.status(200).json({ message: 'Fetch Favorites', results, userinfo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

};