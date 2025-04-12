const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Parse JSON request body

const authRoutes = require("./routes/authRoute");
const bookingRoutes = require("./routes/bookingRoute");

app.use("/api/auth", authRoutes); // Đường dẫn cho các route liên quan đến xác thực người dùng
app.use("/api/booking", bookingRoutes); // Đường dẫn cho các route liên quan đến đặt vé

// Route cơ bản để kiểm tra server
app.get("/", (req, res) => {
  res.send("Welcome to DatLichXemPhim API");
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});