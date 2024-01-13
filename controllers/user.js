const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OtpGenerator = require('otp-generator');
const postmarkClient = require('../postmark');
exports.getAddUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw
        });

        const savedUser = await user.save();

        // Generate OTP
        function generateNumericOtp(length) {
            const min = Math.pow(10, length - 1);
            const max = Math.pow(10, length) - 1;
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        
        const otp = generateNumericOtp(4);
        

        // Save OTP to the user
        await User.findOneAndUpdate({ email }, { otp }, { upsert: true });

        // Send email with OTP
        const message = {
            From: 'srs1@3rdeyesoft.com',
            To: email,
            Subject: "Your OTP",
            Textbody: `Your OTP is ${otp}`,
        };
        const response = await postmarkClient.sendEmail(message);
        console.log("Email Sent With OTP", response);

        // Generate and send JWT token
        const token = jwt.sign(
            {
                email: savedUser.email,
                userId: savedUser._id.toString(),
            },
            'somesupersecretsecret', // Replace 'your-secret-key' with your actual secret key for JWT
            { expiresIn: '1h' } // Set an expiration time for the token
        );
        // Update resetToken and resetTokenExpiration properties
        savedUser.resetToken = token;
        savedUser.resetTokenExpiration = Date.now() + 3600000;
        await savedUser.save();
        req.session.isLoggedIn = true;
        req.session.user = savedUser;
        req.session.save();
        // Send the response with token and user details
        return res.status(200).json({ token: token, userId: savedUser._id.toString(), email: email });
    } catch (err) {
        console.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
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
            return res.status(200).json({ userId: user._id.toString(), email: email });
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

function generateNumericOtp(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const otp = generateNumericOtp(4);
const storedToken = jwt.sign({
    email: email,
    userId: user._id.toString()
},
 'somesupersecretsecret',
 {
    expiresIn: '1h'
 }
);
user.resetToken = storedToken;
user.resetTokenExpiration=Date.now() + 3600000;
user.save();

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
  
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        await User.findOneAndUpdate({ _id: user._id }, { $set: { otp: null } });
  
      //  const newToken = jwt.sign(
   //       { userId: user._id, email: user.email },
   //       "somesupersecretsecret",
   //       { expiresIn: "1h" }
    //    );
        req.session.user = {
          userId: user._id,
          email: user.email,
          password: user.password,
        };
        res.json({ message: "Password updated"});
      
    } catch (error) {
      console.error("Error in change Password OTP:", error);
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
