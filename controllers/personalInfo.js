const PersonalInfo = require('../models/personalInfo');
const filehelper = require('../util/file');
exports.addPersonalInfo = async(req, res, next) =>
{
    const image = req.file.path.replace("\\","/");
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const email = req.body.email;
    const location = req.body.location;
    const userId = req.user._id;
    const baseUrl = 'https://pink-angry-beetle.cyclic.app';
const absoluteImageUrl = `${baseUrl}/${image}`;
    const Personal = new PersonalInfo(
        {
            userImage: absoluteImageUrl,
            fullname: fullname,
            phone: phone,
            email: email,
          location: location,
        userId: userId
        }
    );
    const results  = await Personal.save();
    res.status(200).json({message: "Personal Added", results});
};
exports.updatePersonalInfo = async(req, res, next) =>
{
    const personalId = req.params.personalId;
    const image = req.file.path.replace("\\","/");
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const email = req.body.email;
    const location = req.body.location;
    const baseUrl = 'https://pink-angry-beetle.cyclic.app';
const absoluteImageUrl = `${baseUrl}/${image}`;
    PersonalInfo.findById(personalId).then(personals =>
        {
            if(!personals)
            {
                const error = new Error("Personal Not Found");
                error.statusCode = 404;
                throw error;
            }
            personals.fullname=fullname;
            personals.phone = phone;
            personals.email = email;
            personals.location =location;
            if(image)
            {
                filehelper.deletefile(personals.userImage);
                personals.userImage=absoluteImageUrl;
            }
            return personals.save();
        }).then(result =>
            {
                res.status(200).json({message: "Personal Update", result});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};
exports.deletePersonal = async(req, res, next) =>
{
    const personalId = req.params.personalId;
    PersonalInfo.findById(personalId).then(personals =>
        {
            if(!personals)
            {
                const error = new Error("Personals Not Found");
                error.statusCode=500;
                throw error;
            }
           filehelper.deletefile(personals.userImage);
           return PersonalInfo.findByIdAndDelete(personalId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Deleted Personal"});
            }).catch(err => 
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                });
};
exports.getPersonals = async(req, res, next) =>
{
    const personals = await PersonalInfo.find();
    res.status(200).json({message: 'Fetch Personals', personals});
};