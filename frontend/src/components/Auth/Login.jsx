import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("registeredEmail") || "",
    password: "",
  });
  const [error, setError] = useState("");


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
        localStorage.setItem("token", data.data);
        return fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${data.data}`,
          },
        });
      })
      .then((res) => res.json())
      .then((userData) => {
        localStorage.setItem("userRole", userData.data.role);
        const redirectUrl = localStorage.getItem("redirectUrl");
        if (userData.data.role === "ADMIN") {
          window.location.href = "/admin/movies";
        } else if (redirectUrl) {
          localStorage.removeItem("redirectUrl");
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/movies";
        }
        window.dispatchEvent(new Event("storage"));
      })
      .catch((err) => {
        setError(err.message);
      });
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

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1500}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
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
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <motion.div variants={childVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "transparent",
                    letterSpacing: 3,
                    mb: 1,
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
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Khám phá thế giới điện ảnh đỉnh cao
                </Typography>
              </motion.div>
            </Box>

            {error && (
              <motion.div variants={childVariants}>
                <Typography
                  color="error"
                  align="center"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
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
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.05)",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: "rgba(255, 255, 255, 0.4)" },
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
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.05)",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: "rgba(255, 255, 255, 0.4)" },
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
                    mt: 4,
                    py: 1.5,
                    background:
                      "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                    backgroundSize: "200%",
                    borderRadius: 2,
                    fontWeight: 700,
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
                  Đăng nhập
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

              <motion.div variants={childVariants}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    mt: 3,
                    color: "rgba(255, 255, 255, 0.5)",
                    letterSpacing: 1,
                  }}
                >
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#e50914",
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#ff6f61")}
                    onMouseLeave={(e) => (e.target.style.color = "#e50914")}
                  >
                    Đăng ký ngay
                  </Link>
                </Typography>
              </motion.div>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};
export default Login;
