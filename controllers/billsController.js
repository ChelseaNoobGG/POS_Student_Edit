const Bill = require("../models/billsModel");

// Controller สำหรับเพิ่มบิล
const addBillsController = async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json({ message: "เพิ่มบิลเรียบร้อย" });
  } catch (error) {
    res.status(500).json({ message: "ล้มเหลวในการเพิ่มบิล", error });
  }
};

// Controller สำหรับดึงบิลทั้งหมด
const getBillsController = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "ล้มเหลวในการดึงข้อมูลบิล", error });
  }
};

module.exports = { addBillsController, getBillsController };
