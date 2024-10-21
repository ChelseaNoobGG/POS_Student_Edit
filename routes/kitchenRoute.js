const express = require("express");
const router = express.Router();
const {
  sendOrderToKitchen, 
  getOrders, 
  completeOrder, 
  cancelOrder 
} = require("../controllers/kitchenController");

// กำหนด routes
router.post("/send-order", sendOrderToKitchen);
router.get("/get-orders", getOrders);
router.post("/complete-order/:id", completeOrder);
router.post("/cancel-order/:id", cancelOrder);

module.exports = router; // ต้อง export router ออกมา
