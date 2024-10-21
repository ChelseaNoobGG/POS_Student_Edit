import React, { useState, useEffect } from "react";
import { Row, Col, Button, Badge, message, Typography, Card } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ItemList from "../components/ItemList"; // เรียกใช้  itemlist
import "../styles/OrderPageStyles.css"; // import ไฟล์ CSS

const { Title } = Typography;

const OrderPage = () => {
  const [itemsData, setItemsData] = useState([]); // สถานะที่ใช้เก็บข้อมูลสินค้าทั้งหมด
  const [categories, setCategories] = useState([]); // สถานะที่ใช้เก็บประเภทของสินค้า
  const [selectedCategory, setSelectedCategory] = useState("all"); // สถานะที่เก็บหมวดหมู่สินค้าที่เลือก
  const { tableId } = useParams(); // ใช้ดึง tableId จาก URL
  const dispatch = useDispatch(); // ใช้เพื่อส่ง action ไปยัง Redux store
  const navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าอื่น
  const cartItems = useSelector((state) => state.rootReducer.cartItems || []); // ดึงข้อมูลตะกร้าสินค้าจาก Redux store


  useEffect(() => {
    const fetchItemsAndCategories = async () => {
      try {
        const itemsResponse = await axios.get("/api/items/get-item");
        setItemsData(itemsResponse.data);// เก็บข้อมูลที่ได้จากสินค้า

        const typesResponse = await axios.get("/api/types/get-type");
        const typesData = typesResponse.data; // เก็บประเภทสินค้า
        const uniqueCategories = [
          { name: "ทุกประเภท", value: "all", image: "" },
          ...typesData.map((type) => ({
            name: type.name,
            value: type.name,
            image: type.image,
          })),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        message.error("ไม่สามารถดึงข้อมูลสินค้าและประเภทได้");
      }
    };

    fetchItemsAndCategories();
  }, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } }); // ส่ง action ไปยัง Redux เพื่อลงสินค้าในตะกร้า
    message.success(`เพิ่ม ${item.name} ลงในตะกร้าเรียบร้อยแล้ว!`); // แจ้งเตือนเมื่อเพิ่มสินค้าในตะกร้า
  };

  const filteredItems =
    selectedCategory === "all"
      ? itemsData
      : itemsData.filter((item) => item.category.name === selectedCategory); // กรองสินค้าตามหมวดหมู่ที่เลือก


      const goToCartPage = () => {
        navigate(`/orders/cart/${tableId}`); // พอกดปุ่มนี้แล้วจะไปหน้าตระกร้าสินค้า
      };
    
  return (
    <div className="order-page-container">
      <div className="order-page-header">
        <Title level={3} className="order-page-title">
          สั่งอาหารสำหรับโต๊ะที่ {tableId} 
        </Title>
        <Row gutter={[8, 8]} justify="center">
          {categories.map((category) => (
            <Col
              key={category.value}
              xs={8}
              sm={6}
              md={4}
              lg={3}
              style={{ textAlign: "center" }}
            >
              <Card
                hoverable
                onClick={() => setSelectedCategory(category.value)}
                className={`category-card ${
                  selectedCategory === category.value
                    ? "selected-category"
                    : "unselected-category"
                }`}
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      marginBottom: "5px",
                    }}
                  />
                ) : (
                  <ShoppingCartOutlined
                    className={`category-icon ${
                      selectedCategory === category.value
                        ? "category-icon-selected"
                        : "category-icon-unselected"
                    }`}
                  />
                )}
                <div
                  className={`category-name ${
                    selectedCategory === category.value
                      ? "category-name-selected"
                      : "category-name-unselected"
                  }`}
                >
                  {category.name}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="cart-button-container">
        <Badge count={cartItems.length} offset={[5, 5]} color="#f5222d">
          <Button
            type="primary"
            onClick={goToCartPage}
            icon={<ShoppingCartOutlined />}
            className="cart-button"
          >
            ไปที่ตะกร้าสินค้า
          </Button>
        </Badge>
      </div>
      <Row gutter={[16, 16]} justify="center" style={{ padding: "0 20px" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col xs={24} lg={6} md={8} sm={12} key={item._id}>
              <ItemList item={item} onAddToCart={() => addToCart(item)} />
            </Col>
          ))
        ) : (
          <Col span={24} className="no-items">
            <h3>ไม่มีสินค้าในประเภทนี้</h3>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default OrderPage;
