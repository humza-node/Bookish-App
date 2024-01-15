const Finish = require('../models/finish');
const Book = require('../models/book');
let playbackTimeout;
exports.addFinish = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookId = req.body.bookId;

    // Fetch the book instance based on bookId
    const book = await Book.findById(bookId);

    // Ensure the book exists
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
     const audioDuration = book.audioDuration;
    // Play the audio
    await playaudio(book.bookAudioUrl, audioDuration);

    // Create and save the finish record
    const finish = new Finish({
      userId: userId,
      bookId: bookId,
    });
    const results = await finish.save();

    res.status(200).json({ message: 'Finish stored successfully', results });
  } catch (error) {
    console.error('Error storing finish', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }  
finally
{
  clearPlaybackTimeout();
}

};

async function playaudio(audioUrl, duration) {
  return new Promise((resolve) => {
 playbackTimeout = setTimeout(() => {
      console.log('Audio Playback Finished');
      resolve();
    }, duration * 1000);
  });
}
 function clearPlaybackTimeout()
 {
  if(playbackTimeout)
  {
    clearTimeout(playbackTimeout);
    console.log("Audio PlayBack Stopped");
  }
 }


exports.deleteFinish = async(req, res, next) =>
{
    const finishId = req.params.finishId;
    Finish.findById(finishId).then(finishes =>
        {
            if(!finishes)
            {
                const error = new Error("Finish not Found");
                error.statusCode = 404;
                throw error;
            }
            const results= Finish.findByIdAndDelete(finishId);
        res.status(200).json({message: "Results", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statuCode=500;
                }
                next(err);
            });
};
exports.getFinish = async(req, res, next) =>
{
    const finish = await Finish.find();
    const bookId = (await (finish)).map(finish =>finish.bookId);
    const books = await Book.find({_id: { $in: bookId}});
    const image = (await (books)).map(books =>books.bookImageUrl);
    const title = (await (books)).map(books =>books.booktitle);
    const authorname = (await (books)).map(books =>books.authorName);
    const rating = (await (books)).map(books =>books.bookrating);
    const minutes = (await (books)).map(books =>books.mintues);
    const audioUrl = (await (books)).map(books =>books.bookAudioUrl);
    res.status(200).json({message: "Fetch Finished", image, title, authorname, rating, minutes, audioUrl});
};
