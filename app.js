const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bookish.wyns0ux.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();
const store = new MongoDbStore({
    uri: MONGO_DB_URI,
    collection: 'sessions'
});

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb)
        {
            cb(null, 'images');
        },
        filename: function(req, file, cb)
        {
            cb(null, uuidv4());
        }
    }
);
const filefilter = (req, file, cb) =>
{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
};
app.use(multer({storage: storage, fileFilter: filefilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const UserRoute = require('./routes/user');
const OnboardRoute = require('./routes/onboard');
const CardsRoute = require('./routes/cards');
const AuthorRoute = require('./routes/author');
const BooksRoute = require('./routes/book');
const FavoriteRoute = require('./routes/favorite');
const BookMarkRoute = require('./routes/bookmark');
const CommentRoute = require('./routes/comments');
const HighlightRoute = require('./routes/highlight');
const PlayListRoute = require('./routes/playlist');
const FinishRoute = require('./routes/finish');
const PersonalRoute = require('./routes/personal');
const DownloadRoute = require('./routes/download');
const RatingRoute = require('./routes/rating');
// Middleware to set locals for templates
app.use((req, res, next) => {
    req.session = req.session || {};
    res.locals.isAuthenticated = req.session.isLoggedIn || false;
    next();
});

// Middleware for user authentication
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

// Routes
app.use(UserRoute);
app.use(OnboardRoute);
app.use(CardsRoute);
app.use(AuthorRoute);
app.use(BooksRoute);
app.use(FavoriteRoute);
app.use(BookMarkRoute);
app.use(CommentRoute);
app.use(HighlightRoute);
app.use(PlayListRoute);
app.use(FinishRoute);
app.use(PersonalRoute);

app.use(DownloadRoute);
app.use(RatingRoute);
// Start your server
mongoose.connect(MONGO_DB_URI)
    .then(results => {
        app.listen(process.env.PORT || 3000);
 })
    .catch(err => {
        console.log(err);
});
