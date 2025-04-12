import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("registeredEmail") || "",
    password: "",
  });
  const [error, setError] = useState("");

  // Xóa email đã lưu sau khi đã load
  useEffect(() => {
    const registeredEmail = localStorage.getItem("registeredEmail");
    if (registeredEmail) {
      setFormData((prev) => ({ ...prev, email: registeredEmail }));
      localStorage.removeItem("registeredEmail");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đăng nhập không thành công");
        }
        return res.json();
      })
      .then((data) => {
        // Lưu token
        localStorage.setItem("token", data.data);

        // Lấy thông tin user để kiểm tra role
        return fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${data.data}`,
          },
        });
      })
      .then((res) => res.json())
      .then((userData) => {
        // Lưu role user
        localStorage.setItem("userRole", userData.data.role);

        // Chuyển hướng dựa vào role
        if (userData.data.role === "ADMIN") {
          window.location.href = "/admin/movies"; // Trang quản lý phim cho admin
        } else {
          // Redirect user thường
          const redirectUrl = localStorage.getItem("redirectUrl");
          if (redirectUrl) {
            localStorage.removeItem("redirectUrl");
            window.location.href = redirectUrl;
          } else {
            window.location.href = "/movies";
          }
        }

        window.dispatchEvent(new Event("storage"));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px", // nếu có navbar cao 64px
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/images/anhNen/anhNenAuth.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: 4,
            color: "#fff",
            width: "100%",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", letterSpacing: 1 }}
          >
            🎬 RẠP PHIM LGTV
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Đăng nhập tài khoản của bạn
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="filled"
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              variant="filled"
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#e50914",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
              }}
            >
              Đăng nhập
            </Button>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Bạn chưa có tài khoản?{" "}
              <Link nk to="/register" style={{ color: "#e50914" }}>
                Đăng ký
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
