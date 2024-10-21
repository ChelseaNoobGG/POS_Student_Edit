import React, { useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { QRCodeCanvas } from "qrcode.react";
import { Input, Button, Typography, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons"; // ไอคอนฟันเฟือง

const QRCodePage = () => {
  const [numTables, setNumTables] = useState(1); // ตั้งค่าหมายเลขโต๊ะ
  const [customUrl, setCustomUrl] = useState(""); // เก็บ URL ที่ผู้ใช้กรอก
  const [showUrlInput, setShowUrlInput] = useState(false); // ควบคุมการแสดงฟิลด์ URL
  const qrRef = useRef();
  const baseUrl = "http://localhost:3000/order/";

  // ฟังก์ชันสลับการแสดงฟิลด์ URL
  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
  };

  return (
    <DefaultLayout>
      <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
        <Typography.Title level={2} style={{ marginBottom: "30px", color: "#1890ff" }}>
          สร้าง QR Code สำหรับสั่งอาหาร
        </Typography.Title>

        <div style={{ marginBottom: "20px" }}>
          <Button
            type="default"
            icon={<SettingOutlined />}
            onClick={toggleUrlInput}
          >
            ตัวเลือกเพิ่มเติม
          </Button>
        </div>

        {/* แสดงฟิลด์กรอก URL หากกดปุ่มตัวเลือกเพิ่มเติม */}
        {showUrlInput && (
          <Input
            placeholder="กรุณาใส่ URL ที่ต้องการใช้ (ไม่บังคับ)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            style={{ width: "400px", marginBottom: "20px" }}
          />

        )}

        {/* หมายเลขโต๊ะ */}

        <Input
          type="number"
          min={1}
          value={numTables}
          onChange={(e) => setNumTables(e.target.value)}
          placeholder="จำนวนโต๊ะ"
          style={{ width: "400px", marginBottom: "20px" }}
        />

        {/* อันนี้คือตัวQRCODE ที่มีการเรียกใช้ QR container โดยในcard จะมีการใช้เขียนข้อความ โต๊ัะพร้อมหมายเลขโต๊ะอยู่ในนั้น */}
        <div ref={qrRef} className="qr-container" style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {Array.from({ length: numTables }, (_, index) => (
            <Card
              key={index}
              className="qr-item"
              style={{ width: 200 }}
              hoverable
              bordered={false}
            >
              <Typography.Text style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                โต๊ะที่ {index + 1}
              </Typography.Text>
              <QRCodeCanvas
                value={customUrl ? `${customUrl}/${index + 1}` : `${baseUrl}${index + 1}`} // ใช้ URL ที่กรอกเองหรือ URL พื้นฐาน
                size={150}
                includeMargin={true}
              />
            </Card>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default QRCodePage;
