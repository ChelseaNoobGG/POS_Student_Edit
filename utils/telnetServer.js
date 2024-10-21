const net = require("net");
const fs = require("fs");

const server = net.createServer((socket) => {
  console.log("Client connected");

  // เมื่อ client ส่งข้อมูลมา เราจะจัดการข้อมูลนั้น
  socket.on("data", (data) => {
    const imageUrl = data.toString().trim();
    console.log(`Received URL: ${imageUrl}`);

    // ตรวจสอบว่าเป็น URL ของรูปภาพ
    if (imageUrl.startsWith("http")) {
      // เก็บ URL ลงในฐานข้อมูล หรือในไฟล์ .txt
      storeImageUrl(imageUrl);
      socket.write("URL stored successfully\n");
    } else {
      socket.write("Invalid URL format\n");
    }
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

// ฟังก์ชันสำหรับเก็บ URL
function storeImageUrl(url) {
  fs.appendFileSync("imageUrls.txt", `${url}\n`);
  console.log(`Stored: ${url}`);
}

// Start the server on port 23
server.listen(23, () => {
  console.log("Telnet server listening on port 23");
});
