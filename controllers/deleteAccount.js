const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.deleteUser = async(req, res, next) =>
{
    const userId = req.user._id;
    const password = req.body.password;
    const user = await User.findById(userId);
    if(!user)
    {
        res.status(200).json({message: "Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
    {
        return res.status(200).json({message: "Invalid Password"});
    }

    const result = await User.findByIdAndDelete(userId);
    res.status(200).json({message: "Account Delete SuccessFull", result});
    req.session.destroy(err=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({error: "Internal Server Error"});
        }
        res.status(200).json({message: "User Remove From Session"});
    }); 
};