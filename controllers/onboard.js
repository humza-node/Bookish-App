const Onboard = require('../models/onboard');
exports.getAddOnboard = async (req, res, next) => {
    const selectedOptions1 = req.body.answer1; // Use selectedOptions1 to match the model
    const selectedOptions2 = req.body.answer2; // Use selectedOptions2 to match the model
    const selectedOptions3 = req.body.answer3; // Use selectedOptions3 to match the model
    const selectedOptions4 = req.body.answer4; // Use selectedOptions4 to match the model

    // Assuming req.user contains the userId
    const userId = req.user._id; // Assuming the user ID is available in req.user._id

    const onboards = new Onboard({
        selectedOptions1: selectedOptions1,
        selectedOptions2: selectedOptions2,
        selectedOptions3: selectedOptions3,
        selectedOptions4: selectedOptions4,
        userId: userId, // Provide the userId when creating the Onboard instance
    });

    try {
        const results = await onboards.save();
        res.status(200).json({ message: "Onboards Saved", results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
};

  exports.getUpdateOnboard = async (req, res, next) =>
  {
    try
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
onboards.selectedOptions1=answer1;
onboards.selectedOptions2=answer2;
onboards.selectedOptions3=answer3;
onboards.selectedOptions4=answer4;
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
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
  };
exports.getOnboards = async (req, res, next) =>
{
    try
    {
const results = await Onboard.find();
res.status(200).json({message: "Fetched Onboards", results});
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
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
            next(err);
        });
};