import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      // Hiển thị thông báo thành công
      alert("Đăng ký tài khoản thành công!");

      // Lưu email vào localStorage để điền sẵn form login
      localStorage.setItem("registeredEmail", formData.email);

      // Chuyển hướng về trang login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
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
      <Paper
        elevation={10}
        sx={{
          p: 5,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderRadius: 4,
          color: "#fff",
          width: "100%",
          maxWidth: 440,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", letterSpacing: 1, color: "#fff" }}
          >
            🎬 RẠP PHIM LGTV
          </Typography>
        </Box>

        <Typography variant="h6" align="center" sx={{ mb: 2, color: "#ccc" }}>
          Đăng ký tài khoản của bạn
        </Typography>

        {error && (
          <Typography
            color="error"
            align="center"
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,0,0,0.1)",
              p: 1,
              borderRadius: 1,
            }}
          >
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Họ tên"
            name="name"
            variant="filled"
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
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
            label="Mật khẩu"
            name="password"
            type="password"
            variant="filled"
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            variant="filled"
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
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
            Đăng ký
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
