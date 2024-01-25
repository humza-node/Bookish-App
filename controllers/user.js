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
        return res.status(200).json({message: "The User Signup Succesfully", token: token });
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
            return res.status(200).json({message: "The User Login Successfully"});
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
};
exports.postOTPEmail = async (req, res, next) => {
    const email = req.body.email;
  
    try {
      if (!email) {
        return res.status(400).json({ message: 'Email not provided.' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Email does not exist in our records.' });
      }
  
      const otp = generateNumericOtp(4);
  
      await User.findOneAndUpdate({ email }, { otp }, { upsert: true });
  
      const message = {
        From: 'srs1@3rdeyesoft.com',
        To: email,
        Subject: 'Your OTP',
        TextBody: `Your OTP is ${otp}`,
      };
  
      const response = await postmarkClient.sendEmail(message);
      res.status(200).json({ message: 'OTP sent successfully.'});
    } catch (err) {
      console.error('Error in postOTPEmail:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  };
  
  function generateNumericOtp(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  exports.changePasswordOTP = async (req, res, next) => {
    try {
      const { otp, password, passwordToken } = req.body;
  
      // Check if password is provided
      if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
      }
  
      // Check if password exists
      const userWithPassword = await User.findOne({ password });
  
      if (!userWithPassword) {
        return res.status(400).json({ message: 'Password Not exists.' });
      }
  
      const user = await User.findOne({
        otp: otp,
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or OTP expired.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      await user.save();
      await User.findOneAndUpdate({ _id: user._id }, { $set: { otp: null } });
  
      // You might consider creating a new JWT token here, but it's commented out in your code
  
      req.session.user = {
        userId: user._id,
        email: user.email,
        password: user.password, // Note: Storing the password in the session might not be necessary or recommended
      };
  
      res.json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error in change Password OTP:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      next(error);
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
        next(error);
    });
};
