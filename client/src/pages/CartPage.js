import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, message, Form, Input, Select } from "antd";
import "../styles/CartPageStyles.css"; // ใช้ไฟล์ CSS ที่ตกแต่งแล้ว

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  // คำนวณยอดรวม
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  // ฟังก์ชันสำหรับสร้างบิล
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("/api/bills/add-bills", newObject);
      message.success("ออกใบเสร็จเรียบร้อยแล้ว");
      navigate("/bills");
    } catch (error) {
      message.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      console.log(error);
    }
  };

  // ตั้งค่าคอลัมน์ของตาราง
  const columns = [
    { title: "ชื่อสินค้า", dataIndex: "name" },
    {
      title: "รูปภาพ",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "ราคา", dataIndex: "price" },
    {
      title: "จำนวน",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer", color: "#52c41a" }}
            onClick={() => handleIncreament(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer", color: "#f5222d" }}
            onClick={() => handleDecreament(record)}
          />
        </div>
      ),
    },
    {
      title: "การจัดการ",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer", color: "#f5222d" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="cart-page">
        <h1 className="page-title">ตะกร้าสินค้า</h1>
        <Table columns={columns} dataSource={cartItems} bordered />
        <div className="summary-section">
          <hr />
          <h3>
            ยอดรวม: <b>{subTotal} บาท</b>
          </h3>
          <Button
            type="primary"
            onClick={() => setBillPopup(true)}
            style={{ marginTop: "20px" }}
          >
            ออกใบเสร็จ
          </Button>
        </div>
      </div>

      <Modal
        title="สร้างใบเสร็จ"
        visible={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="ชื่อลูกค้า">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="เบอร์โทรศัพท์ลูกค้า">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="วิธีชำระเงิน">
            <Select>
              <Select.Option value="cash">เงินสด</Select.Option>
              <Select.Option value="card">บัตรเครดิต/เดบิต</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-summary">
            <h5>
              ยอดรวมย่อย: <b>{subTotal} บาท</b>
            </h5>
            <h5>
              ภาษี (10%): <b>{((subTotal / 100) * 10).toFixed(2)} บาท</b>
            </h5>
            <h3>
              ยอดรวมทั้งหมด:{" "}
              <b>
                {(
                  Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
                ).toFixed(2)}{" "}
                บาท
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              ออกใบเสร็จ
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
