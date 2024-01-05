const PersonalControll = require('../controllers/personalInfo');
const express = require('express');
const router = express.Router();
router.post('/add-personal', PersonalControll.addPersonalInfo);
router.put('/update-personal/:personalId', PersonalControll.updatePersonalInfo);
router.delete('/delete-personal/:personalId', PersonalControll.deletePersonal);
router.get('/get-personals', PersonalControll.getPersonals);
module.exports = router;