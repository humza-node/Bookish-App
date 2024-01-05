const UserController = require('../controllers/user');
const AccountDelete = require('../controllers/deleteAccount');
const ChangePassword = require('../controllers/changePassword');
const express = require('express');
const router = express.Router();
router.post('/signup', UserController.getAddUser);
router.post('/login', UserController.login);
router.post('/forget', UserController.postOTPEmail);
router.post('/confirmPassword', UserController.changePasswordOTP);
router.get('/getUsers', UserController.getUsers);
router.post('/logout', UserController.logout);

router.delete('/password', AccountDelete.deleteUser);

router.post('/change-password', ChangePassword.getChangePassword);


module.exports = router;
