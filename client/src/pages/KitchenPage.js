import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import "../styles/ReceiptStyles.css"; 

const KitchenPage = () => {
  const [orders, setOrders] = useState([]);
  
  // ฟังก์ชันดึงข้อมูลออเดอร์ทั้งหมดจาก API
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/kitchen/get-orders");
      setOrders(data);
    } catch (error) {
      message.error("ไม่สามารถดึงข้อมูลออเดอร์ได้");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // ฟังก์ชันเสร็จสิ้นออเดอร์ และบันทึกบิล
  const handleCompleteOrder = async (orderDetails) => {
    try {
      // เสร็จสิ้นออเดอร์ในฝั่งเซิร์ฟเวอร์
      await axios.post(`/api/kitchen/complete-order/${orderDetails._id}`);
      
      // บันทึกข้อมูลบิลหลังจากเสร็จสิ้นออเดอร์
      const billData = {
        tableId: orderDetails.tableId,
        items: orderDetails.cartItems,
        totalAmount: orderDetails.subTotal
      };
      
      await axios.post("/api/bills/add-bills", billData);
      
      message.success("ออเดอร์เสร็จสิ้นและบันทึกบิลเรียบร้อย!");
      getAllOrders(); // อัพเดทรายการออเดอร์หลังจากเสร็จสิ้น
    } catch (error) {
      message.error("ไม่สามารถเสร็จสิ้นออเดอร์ได้");
      console.log(error);
    }
  };

  // ฟังก์ชันยกเลิกออเดอร์
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(`/api/kitchen/cancel-order/${orderId}`);
      message.success("ออเดอร์ถูกยกเลิกแล้ว!");
      getAllOrders(); 
    } catch (error) {
      message.error("ไม่สามารถยกเลิกออเดอร์ได้");
      console.log(error);
    }
  };

  // กำหนดโครงสร้างตารางสำหรับแสดงออเดอร์
  const columns = [
    { title: "โต๊ะ", dataIndex: "tableId" },
    {
      title: "รายการอาหาร",
      dataIndex: "cartItems",
      render: (items) => items.map((item) => item.name).join(", "),
    },
    { title: "ยอดรวม", dataIndex: "subTotal" },
    {
      title: "การกระทำ",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <Button type="primary" onClick={() => handleCompleteOrder(record)}>
            เสร็จสิ้นออเดอร์
          </Button>
          <Button
            type="danger"
            onClick={() => handleCancelOrder(id)}
            style={{ marginLeft: "10px" }}
          >
            ยกเลิกออเดอร์
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div>
        <h1>รายการออเดอร์ในครัว</h1>
        <Table columns={columns} dataSource={orders} rowKey="_id" />
      </div>
    </DefaultLayout>
  );
};

export default KitchenPage;
