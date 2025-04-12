const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Parse JSON request body

// Route cơ bản để kiểm tra server
app.get("/", (req, res) => {
  res.send("Welcome to DatLichXemPhim API");
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
