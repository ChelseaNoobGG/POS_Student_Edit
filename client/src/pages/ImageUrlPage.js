import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography, Card } from "antd";
import DefaultLayout from "../components/DefaultLayout"; // นำเข้ามาใช้ DefaultLayout

const { Title, Text } = Typography;

const ImageUrlPage = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const { data } = await axios.get("/api/images/get-urls");
      setImageUrls(data);
    };

    fetchImageUrls();
  }, []);

  return (
    <DefaultLayout>
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Stored Image URLs
        </Title>

        {imageUrls.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={imageUrls}
            renderItem={(url, index) => (
              <List.Item>
                <Card style={{ borderRadius: "10px" }}>
                  <Text>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </Text>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Text type="secondary">No URLs stored</Text>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ImageUrlPage;
