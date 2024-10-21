import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, message, Typography } from "antd";
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const OrderCartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tableId } = useParams();
  const { cartItems } = useSelector((state) => state.rootReducer);

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const handleIncrement = (record) => {
    const newQuantity = record.quantity + 1;
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: newQuantity },
    });
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const handleDecrement = (record) => {
    if (record.quantity > 1) {
      const newQuantity = record.quantity - 1;
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: newQuantity },
      });
    } else {
      handleDelete(record);
    }
  };

  // ฟังก์ชันลบสินค้า
  const handleDelete = (record) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: record,
    });
    message.info(`ลบ ${record.name} ออกจากตะกร้าเรียบร้อยแล้ว`);
  };

  // คำนวณยอดรวม
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  // ฟังก์ชันส่งออเดอร์ไปยังครัว
const handleSendOrderToKitchen = async () => {
  if (cartItems.length === 0) {
    message.error("ไม่มีสินค้าในตะกร้า");
    return;
  }

  try {
    const orderDetails = {
      cartItems,
      subTotal,
      tableId,
    };

    // เรียก API ส่งออเดอร์ไปยังครัว
    const response = await axios.post("/api/kitchen/send-order", orderDetails);

    if (response.status === 200) {
      message.success("ออเดอร์ถูกส่งไปยังครัวแล้ว!");

      // เคลียร์ตะกร้าสินค้า
      dispatch({
        type: "CLEAR_CART",
      });
    } else {
      throw new Error("เกิดข้อผิดพลาดในการส่งออเดอร์");
    }
  } catch (error) {
    message.error("การส่งออเดอร์ล้มเหลว กรุณาลองใหม่อีกครั้ง");
    console.error("Error sending order to kitchen: ", error.response?.data?.message || error.message);
  }
};
  

  // การตั้งค่า columns สำหรับตาราง
  const columns = [
    { title: "ชื่อสินค้า", dataIndex: "name" },
    {
      title: "รูปภาพ",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "ราคา", dataIndex: "price", render: (price) => `${price} บาท` },
    {
      title: "จำนวน",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            style={{ cursor: "pointer", color: "#52c41a" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            style={{ cursor: "pointer", color: "#f5222d" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "การกระทำ",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer", color: "#f5222d" }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        สั่งอาหารสำหรับโต๊ะที่ {tableId}
      </Title>
      <Table columns={columns} dataSource={cartItems} bordered rowKey="_id" />
      <div className="d-flex flex-column align-items-end" style={{ marginTop: "20px" }}>
        <hr />
        <h3>ยอดรวม: <b>{subTotal.toFixed(2)} บาท</b></h3>
        <Button type="primary" onClick={handleSendOrderToKitchen}>
          ส่งออเดอร์ไปยังครัว
        </Button>
        <Button type="default" style={{ marginTop: "10px" }} onClick={() => navigate(`/order/${tableId}`)}>
          กลับไปเลือกเมนู
        </Button>
      </div>
    </div>
  );
};

export default OrderCartPage;
