const express = require('express');
const { getBillsController, addBillsController } = require('../controllers/billsController');
const router = express.Router();

// เส้นทางสำหรับเพิ่มบิล
router.post('/add-bills', addBillsController);

// เส้นทางสำหรับดึงบิลทั้งหมด
router.get('/get-bills', getBillsController);

module.exports = router;
