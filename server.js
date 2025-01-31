const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require("colors");
const connectDb = require("./config/config");
const telnetServer = require("./utils/telnetServer"); // หรือระบุตำแหน่งที่คุณเก็บ telnetServer.js



// Routes
const kitchenRoutes = require("./routes/kitchenRoute");
const billsRoute = require('./routes/billsRoute'); // เพิ่มเส้นทางบิล
const imageRoutes = require("./routes/imageRoutes");

// dotenv config
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", billsRoute); // ใช้เส้นทางสำหรับบิล
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/types", require("./routes/typeRoutes"));
app.use("/api/images", imageRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
