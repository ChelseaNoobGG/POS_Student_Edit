import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../components/DefaultLayout";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null); // บิลที่เลือกเพื่อปริ้น
  const printRef = useRef();

  const getAllBills = async () => {
    try {
      const { data } = await axios.get("/api/bills/get-bills");
      setBills(data);
    } catch (error) {
      message.error("ไม่สามารถดึงข้อมูลใบเสร็จได้");
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  // ฟังก์ชันปริ้นใบเสร็จ
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // เมื่อเลือกบิลสำหรับปริ้น
  const handleSelectBill = (record) => {
    setSelectedBill(record);
    handlePrint();
  };

  const columns = [
    { title: "รหัสใบเสร็จ", dataIndex: "_id" },
    {
      title: "วันที่ขาย",
      dataIndex: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "รายการอาหาร",
      dataIndex: "items",
      render: (items) => items.map((item) => item.name).join(", "),
    },
    { title: "โต๊ะ", dataIndex: "tableId" },
    { title: "ยอดรวม", dataIndex: "totalAmount" },
    {
      title: "การกระทำ",
      render: (record) => (
        <Button type="primary" onClick={() => handleSelectBill(record)}>
          ปริ้นใบเสร็จ
        </Button>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <h1>รายการใบเสร็จ</h1>
      <Table columns={columns} dataSource={bills} rowKey="_id" />

      {/* ใบเสร็จที่จะปริ้น */}
      {selectedBill && (
        <div style={{ display: "none" }}>
          <div ref={printRef} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ใบเสร็จรับเงิน</h2>
            <p><b>รหัสใบเสร็จ:</b> {selectedBill._id}</p>
            <p><b>วันที่ขาย:</b> {new Date(selectedBill.date).toLocaleDateString()}</p>
            <p><b>โต๊ะ:</b> {selectedBill.tableId}</p>
            <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>รายการ</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>จำนวน</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>ราคา</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill.items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px 0" }}>{item.name}</td>
                    <td style={{ textAlign: "center", padding: "8px 0" }}>{item.quantity}</td>
                    <td style={{ textAlign: "right", padding: "8px 0" }}>{item.price} บาท</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <p><b>ยอดรวม:</b> {selectedBill.totalAmount} บาท</p>
            </div>
            <p style={{ textAlign: "center", marginTop: "40px" }}>ขอบคุณที่ใช้บริการ</p>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
