const express = require('express');
const { CreateInfo, getBankInfo, deleteBankInfo, updateBankInfo } = require('../controllers/BankInfo.controller');
const router = express.Router();

router.post('/Create-info', CreateInfo);
router.get('/get-info', getBankInfo);
router.delete('/delete-info/:id', deleteBankInfo);
router.post('/update-info/:id', updateBankInfo);




module.exports = router;
