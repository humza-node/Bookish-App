const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OtpGenerator = require('otp-generator');
const postmarkClient = require('../postmark');
exports.getAddUser = async(req, res, next) =>
{
const email = req.body.email;
const password = req.body.password;
const confirmPassword = req.body.confirmPassword;
if(password!==confirmPassword)
{
   return res.status(400).json({message: "Password Not Matched"});
}
else  if(password === confirmPassword)
{
bcrypt.hash(password, 12).then(hashedPw =>
    {
        const user = new User(
            {
                email: email,
                password: hashedPw
            }
        );
        return user.save();
    }).then(results =>
        {
            return res.status(200).json({message: "User Created", userId: results._id});
        }).catch(err => {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        }
        );
}
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error("A user with this email could not be found");
            error.statusCode = 401;
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            const error = new Error("Incorrect password");
            error.statusCode = 401;
            throw error;
        }

        // Set the user in the session
        req.session.isLoggedIn = true;
        req.session.user = user;

        // Save the session
        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id.toString()
                },
                'somesupersecretsecret',
                {
                    expiresIn: "1h"
                }
            );
            user.resetToken=token;
            user.resetTokenExpiration = Date.now() + 3600000;
            user.save();
            return res.status(200).json({ token: token, userId: user._id.toString(), email: email });
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
};
exports.postOTPEmail = async(req, res, next) =>
{
const email = req.body.email;
const user = await User.findOne({email: email});
const storedToken = user.resetToken;
const otp = OtpGenerator.generate(4, {upperCaseAlphabets: false, specialChars: false});
try
{
    await User.findOneAndUpdate({email}, {otp}, {upsert: true});
}
catch(err)
{
    console.log(err);
}
const message = {
    From: 'srs1@3rdeyesoft.com',
    To: email,
    Subject: "Your OTP",
    Textbody: `Your OTP is ${otp} and Token ${storedToken}`,
};
const response = await postmarkClient.sendEmail(message);
console.log("Email Sent With OTP", response);
};
exports.changePasswordOTP = async (req, res, next) => {
    const otp = req.body.otp;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const passwordToken = req.body.passwordToken;
  
    try {
      const user = await User.findOne({
        otp: otp,
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found or OTP expired" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password not matched" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        await User.findOneAndUpdate({ _id: user._id }, { $set: { otp: null } });
  
        const newToken = jwt.sign(
          { userId: user._id, email: user.email },
          "somesupersecretsecret",
          { expiresIn: "1h" }
        );
        req.session.user = {
          userId: user._id,
          email: user.email,
          password: user.password,
        };
        res.json({ message: "Password updated", newToken });
      }
    } catch (error) {
      console.error("Error in changePasswordOTP:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
exports.getUsers = async(req, res, next) =>
{
    const results = await User.find();
    return res.status(200).json({message: "Fetch Users", results});
};
exports.logout = async(req, res, next) =>
{
    req.session.destroy(err=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({error: "Internal Server Error"});
        }
        res.status(200).json({message: "Logout Successfull"});
    })
};
