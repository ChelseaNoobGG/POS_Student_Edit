import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleAddTOCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },// จำนวนสินค้้าที่เพิ่มต่อการกด 1 ครั้ง 
    });
  };
  

  const { Meta } = Card; // ตรงนี้คือCARDของสินค้า

  return (
    <div style={styles.itemContainer}>
      <Card
        hoverable
        style={styles.cardStyle}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={styles.imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(100%)")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(95%)")}
          />
        }
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Meta
          title={<span style={styles.titleStyle}>{item.name}</span>}
          description={
            <>
              <p style={styles.categoryText}>
                ประเภทสินค้า:{" "}
                <span style={styles.categoryHighlight}>
                  {item.category?.name || "N/A"}
                </span>
              </p>
              <p style={styles.priceText}>
                ฿{item.price.toFixed(2)}
              </p>
            </>
          }
        />
        {/* ตรงส่วนนี้คือปุ่มที่กดเลือกสินค้า ที่มีฟังก์ชั่นเพิ่มสินค้าไปที่ตระกร้า */}
        <div style={styles.buttonContainer}>
          <Button
            type="primary"
            shape="round"
            icon={<ShoppingCartOutlined />}
            size="large"
            style={styles.buttonStyle}
            onClick={handleAddTOCart}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#389e0d")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#52c41a")}
          >
            เลือกสินค้า
          </Button>
        </div>
      </Card>
    </div>
  );
};

// อันนี้่คือสไตล์ การตกแต่งของ CARD อาหารต่างๆ
const styles = {
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  cardStyle: {
    width: 300,
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    maxWidth: "100%",
  },
  imageStyle: {
    height: 220,
    objectFit: "cover",
    borderBottom: "2px solid #f0f0f0",
    filter: "brightness(95%)",
    transition: "filter 0.3s ease",
    width: "100%",
  },
  titleStyle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  },
  categoryText: {
    margin: 0,
    fontSize: "14px",
    color: "#999",
  },
  categoryHighlight: {
    fontWeight: "bold",
    color: "#1890ff",
  },
  priceText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fa541c",
    marginTop: "5px",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "#52c41a",
    borderColor: "#52c41a",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
};

export default ItemList;
