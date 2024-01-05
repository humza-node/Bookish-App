const Highlight = require('../models/highlights');
exports.addhighLight = async(req, res, next) =>
{
    const userId = req.user._id;
    const bookId = req.body.bookId;
    const selectedText= req.body.selectedText;
const highlight = new Highlight(
    {
        userId: userId,
        bookId: bookId,
        selectedText: selectedText
    }
);
const results = await highlight.save();
res.status(200).json({message: "Fetch Results", results});
};
exports.getlightText = async(req, res, next) =>
{
    const selectedText = await Highlight.find();
    res.status(200).json({message: "Selected Text", selectedText});
};
exports.updatelightText = async(req, res, next) =>
{
    const highlightId = req.params.highlightId;
    const bookId = req.body.bookId;
    const selectedText = req.body.selectedText;
    Highlight.findById(highlightId).then(highlights =>
        {
            if(!highlights)
            {
                const error = new Error('Highlight not Found');
                error.statusCode = 404;
                throw error;
            }
highlights.bookId = bookId;
highlights.selectedText = selectedText;
const results = highlights.save();
return res.status(200).json({message:"Highlights Updated", results});
        }).catch(err =>
        {
            if(!err.statuCode)
            {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.DeleteHighLight = async(req, res, next) =>
{
    const highlightId=req.params.highlightId;
    Highlight.findById(highlightId).then(highlights =>
        {
            if(!highlights)
            {
                const error = new Error("Highlight Not Found");
                error.statuCode=404;
                throw error;
            }
            return Highlight.deleteOne({_id: highlightId, userId: req.user._id});
        }).then(()=>
        {
            console.log("Deleted Highlights");
            res.status(200).json({message: "Success"});
        }).catch(err =>
            {
                res.status(200).json({message: "Not Deleted"});
                next(err);
            });
};