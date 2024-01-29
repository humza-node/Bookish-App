const OnboardImage = require('../models/onboard Image');
const filehelper = require('../util/file');
exports.addOnboardImage = async(req, res, next) =>
{
    try
    {
    const name = req.body.name;
    const image = req.file.path.replace("\\","/");
    const baseUrl = 'https://pink-angry-beetle.cyclic.app';
    const absoluteImageUrl = `${baseUrl}/${image}`;
    const onboards = new OnboardImage(
        {
            name: name,
            image: absoluteImageUrl
        }
    );
    const results = await onboards.save();
    res.status(200).json({message: "Onboards Images", results});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
};
exports.getOnboardImage = async(req, res, next)=>
{
    try
    {
    const results = await OnboardImage.find();
    res.status(200).json({message: "Onboards Images", results});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
};
exports.getUpdateImages = async(req, res, next) =>
{
    const onboardImageId = req.params.onboardImageId;
    const name = req.body.name;
    const image = req.file.path.replace("\\", "/");
    const baseUrl = 'https://pink-angry-beetle.cyclic.app';
    const absoluteImageUrl = `${baseUrl}/${image}`;
    OnboardImage.findById(onboardImageId).then(onboardsImages =>
        {
            if(!onboardsImages)
            {
                const error = new Error("Onboard Images Not Found");
                error.statusCode = 404;
                throw error;
            }
            onboardsImages.name=name;
            if(image)
            {
                filehelper.deletefile(onboardsImages.image);
                onboardsImages.image=absoluteImageUrl;
            }
         return onboardsImages.save();
        }).then(results =>
            {
                res.status(200).json({message: "Onboard Image Update", results});
            }).catch(err =>
                {
                 console.log(err);
                 next(err);
                });
};
exports.deleteImage = async(req, res, next) =>
{
    const onboardImageId = req.params.onboardImageId;
    OnboardImage.findById(onboardImageId).then(onboardsImage =>
        {
            if(!onboardsImage)
            {
                const error = new Error('Onboard Image not Found');
                error.statusCode=404;
                throw error;
            }
            filehelper.deletefile(onboardsImage.image);
            return OnboardImage.findByIdAndDelete(onboardImageId);
        }).then(results =>
            {
                console.log(results);
                res.status(200).json({message: "Deleted Images", onboardImageId});
            }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};