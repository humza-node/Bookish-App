const express = require('express');
const router = express.Router();
const Package = require('../controllers/pricing');
router.post('/add-package', Package.addPrice);
router.get('/get-package', Package.getPrices);
router.put('/update-package/:priceId', Package.updatePrice);
router.delete('/delete-package/:priceId', Package.deletePackage);
module.exports=router;