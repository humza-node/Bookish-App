const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.deleteUser = async(req, res, next) =>
{
    const userId = req.user._id;
    const password = req.body.password;
    const deletionToken = req.body.deletionToken; // Include deletion token in the request body
    
    try {
      const user = await User.findById(userId);
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
    
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
    
      // Check if the deletion token matches the stored token
      if (deletionToken !== user.resetToken) {
        return res.status(401).json({ message: "Invalid deletion token" });
      }
    
      // Destroy the session first
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
    
        // Once the session is destroyed, delete the user account
        User.findByIdAndDelete(userId).then(result=> {
         
          res.status(200).json({ message: "Account successfully deleted", result });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

};