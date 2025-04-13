import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Fade,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person, Email, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";

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

  // Hiệu ứng chuyển động cho container và các thành phần con
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",
        overflow: "hidden",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Hiệu ứng hạt (particle effect) trên nền */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03), transparent 70%)",
          zIndex: 0,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "url('https://www.transparenttextures.com/patterns/stardust.png')",
            opacity: 0.2,
            animation: "moveParticles 20s linear infinite",
          },
          "@keyframes moveParticles": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(-100px, -100px)" },
          },
        }}
      />

      {/* Hiệu ứng ánh sáng động trên nền */}
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(229, 9, 20, 0.1), transparent 70%)",
          animation: "glow 10s ease-in-out infinite",
          zIndex: 0,
          "@keyframes glow": {
            "0%": { transform: "rotate(0deg)" },
            "50%": { transform: "rotate(180deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 520, // Tăng từ 440px lên 520px để card to hơn
          width: "100%",
        }}
      >
        <Fade in timeout={1500}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 5, sm: 7 }, // Tăng padding để nội dung thoáng hơn
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 15px 50px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 60px rgba(229, 9, 20, 0.2)",
                },
              }}
            >
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <motion.div variants={childVariants}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "transparent",
                      letterSpacing: 3,
                      mb: 1.5, // Tăng khoảng cách dưới
                      fontSize: "2.5rem", // Tăng kích thước chữ cho cân đối
                      textTransform: "uppercase",
                      background:
                        "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                      backgroundSize: "200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "gradientText 3s ease infinite",
                      textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                    }}
                  >
                    🎬 LGTV CENIMA
                  </Typography>
                  <style>
                    {`
                      @keyframes gradientText {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                      }
                    `}
                  </style>
                </motion.div>
                <motion.div variants={childVariants}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontStyle: "italic",
                      letterSpacing: 1,
                      fontSize: "1.1rem", // Tăng nhẹ kích thước chữ
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Đăng ký để trải nghiệm điện ảnh đỉnh cao
                  </Typography>
                </motion.div>
              </Box>

              {error && (
                <motion.div variants={childVariants}>
                  <Typography
                    color="error"
                    align="center"
                    sx={{
                      mb: 3, // Tăng khoảng cách dưới
                      fontWeight: 500,
                      fontSize: "1rem", // Tăng nhẹ kích thước chữ
                      textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      p: 1.5, // Tăng padding để thoáng hơn
                      borderRadius: 1,
                    }}
                  >
                    {error}
                  </Typography>
                </motion.div>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <motion.div variants={childVariants}>
                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Họ tên"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#fff",
                        borderRadius: 2,
                        fontSize: "1.1rem", // Tăng kích thước chữ trong input
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.05)",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: "rgba(255, 255, 255, 0.4)", fontSize: "1.1rem" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#e50914",
                          boxShadow: "0 0 15px rgba(229, 9, 20, 0.4)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                      "@keyframes ripple": {
                        "0%": { boxShadow: "0 0 0 0 rgba(229, 9, 20, 0.4)" },
                        "100%": { boxShadow: "0 0 0 20px rgba(229, 9, 20, 0)" },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#fff",
                        borderRadius: 2,
                        fontSize: "1.1rem", // Tăng kích thước chữ trong input
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.05)",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: "rgba(255, 255, 255, 0.4)", fontSize: "1.1rem" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#e50914",
                          boxShadow: "0 0 15px rgba(229, 9, 20, 0.4)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                      "@keyframes ripple": {
                        "0%": { boxShadow: "0 0 0 0 rgba(229, 9, 20, 0.4)" },
                        "100%": { boxShadow: "0 0 0 20px rgba(229, 9, 20, 0)" },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#fff",
                        borderRadius: 2,
                        fontSize: "1.1rem", // Tăng kích thước chữ trong input
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.05)",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: "rgba(255, 255, 255, 0.4)", fontSize: "1.1rem" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#e50914",
                          boxShadow: "0 0 15px rgba(229, 9, 20, 0.4)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                      "@keyframes ripple": {
                        "0%": { boxShadow: "0 0 0 0 rgba(229, 9, 20, 0.4)" },
                        "100%": { boxShadow: "0 0 0 20px rgba(229, 9, 20, 0)" },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#fff",
                        borderRadius: 2,
                        fontSize: "1.1rem", // Tăng kích thước chữ trong input
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.05)",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: "rgba(255, 255, 255, 0.4)", fontSize: "1.1rem" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#e50914",
                          boxShadow: "0 0 15px rgba(229, 9, 20, 0.4)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                      "@keyframes ripple": {
                        "0%": { boxShadow: "0 0 0 0 rgba(229, 9, 20, 0.4)" },
                        "100%": { boxShadow: "0 0 0 20px rgba(229, 9, 20, 0)" },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 5, // Tăng khoảng cách trên
                      py: 2, // Tăng chiều cao nút
                      background:
                        "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                      backgroundSize: "200%",
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: "1.1rem", // Tăng kích thước chữ
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                      transition: "all 0.3s ease",
                      animation: "neonGlow 2s ease-in-out infinite",
                      "&:hover": {
                        backgroundPosition: "100% 50%",
                        transform: "translateY(-3px)",
                        boxShadow: "0 0 30px rgba(229, 9, 20, 0.8)",
                      },
                    }}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đăng ký
                    <style>
                      {`
                        @keyframes neonGlow {
                          0% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
                          50% { box-shadow: 0 0 30px rgba(229, 9, 20, 0.8); }
                          100% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
                        }
                      `}
                    </style>
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Fade>
      </Box>
    </Box>
  );
};

export default Register;