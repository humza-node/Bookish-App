const Onboard = require('../models/onboard');
exports.getAddOnboard = async (req, res, next) => {
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;
    const answer3 = req.body.answer3;
    const answer4 = req.body.answer4;
  
    // Assuming req.user contains the userId
    const userId = req.user._id; // Assuming the user ID is available in req.user._id
  
    const onboards = new Onboard({
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      userId: userId, // Provide the userId when creating the Onboard instance
    });
  
    try {
      const results = await onboards.save();
      res.status(200).json({ message: "Onboards Saved", results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getUpdateOnboard = async (req, res, next) =>
  {
    const onboardId = req.params.onboardId;
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;
    const answer3 = req.body.answer3;
    const answer4 = req.body.answer4;
Onboard.findById(onboardId).then(onboards =>
    {
        if(!onboards)
        {
            const error = new Error("Onboards Questions Not Founds");
            error.statusCode = 404;
            throw error;
        }
onboards.answer1=answer1;
onboards.answer2=answer2;
onboards.answer3=answer3;
onboards.answer4=answer4;
const onboardsUpdated = onboards.save();
res.status(200).json({message: "Onboards Updates", onboardsUpdated});
    }).catch(err =>
        {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        });
  };
exports.getOnboards = async (req, res, next) =>
{
const results = await Onboard.find();
res.status(200).json({message: "Fetched Onboards", results});

};
exports.deleteOnboards = async(req, res, next) =>
{
const onboardId = req.params.onboardId;
Onboard.findById(onboardId).then(onboarding =>
    {
        if(!onboarding)
        {
            const error = new Error("Onboarding Not Found");
            error.statusCode = 404;
            throw error;
        }
        return Onboard.deleteOne({_id: onboardId, userId: req.user._id});
    }).then(()=>
    {
        console.log("Destroy Onboards");
        res.status(200).json({message: "Success"});
    }).catch(err=>
        {
            res.status(500).json({message: "Product Delete Failed"});
        });
};