const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session =require('express-session');
exports.getChangePassword = async(req, res, next) =>
{
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
  
    const userId = req.user._id;
    const user = await User.findById(userId);

    if(!user)
    {
   return     res.status(200).json({message: "User not Found"});
    }
const IsOldPasswordValid = await bcrypt.compare(oldPassword,user.password);
if(!IsOldPasswordValid)
{
  return  res.status(401).json({message: "Invalid Old Password"});
}

const hashedPassword = await bcrypt.hash(newPassword,12);
user.password = hashedPassword;
 await user.save();

// const newToken = jwt.sign({userId: user._id, email: user.email}, 'somesupersecretsecret', {expiresIn: '1h'});

req.session.user = { userId: user._id, email: user.email, password: user.password} ;
res.status(200).json({message: "Password Changed Successfully"});
};