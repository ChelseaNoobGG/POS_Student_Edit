const Order = require("../models/orderModel");

// ฟังก์ชันส่งออเดอร์ไปยังครัว
const sendOrderToKitchen = async (req, res) => {
    try {
      // เพิ่มการ log ข้อมูลที่มาจาก client เพื่อดูว่าได้รับข้อมูลอะไรบ้าง
      console.log("Received order at server:", req.body);
  
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(200).json({ message: "Order sent to kitchen" });
    } catch (error) {
      console.error("Error sending order:", error);
      res.status(500).json({ message: "Failed to send order", error });
    }
  };

  // ฟังก์ชันดึงข้อมูลออเดอร์ทั้งหมด
const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({ status: "Pending" }); // ค้นหาออเดอร์ที่มีสถานะ Pending
      res.status(200).json(orders); // ส่งออเดอร์กลับไปยัง client
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error });
    }
  };
  // ฟังก์ชันเสร็จสิ้นออเดอร์
const completeOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id); // ค้นหาออเดอร์จาก ID
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = "Completed"; // เปลี่ยนสถานะออเดอร์เป็น Completed
      await order.save(); // บันทึกการเปลี่ยนแปลง
  
      res.status(200).json({ message: "Order completed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to complete order", error });
    }
  };
  // ฟังก์ชันยกเลิกออเดอร์
const cancelOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id); // ค้นหาออเดอร์จาก ID
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = "Cancelled"; // เปลี่ยนสถานะออเดอร์เป็น Cancelled
      await order.save(); // บันทึกการเปลี่ยนแปลง
  
      res.status(200).json({ message: "Order cancelled" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel order", error });
    }
  };
  
  
  module.exports = { sendOrderToKitchen, getOrders, completeOrder, cancelOrder };
