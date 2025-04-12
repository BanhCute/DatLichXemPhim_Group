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
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("registeredEmail") || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Đăng nhập không thành công");
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
      .catch((err) => setError(err.message));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
        py: 10,
        px: 2,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hiệu ứng nền mờ động */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.05), transparent 60%)",
          animation: "pulse 6s infinite ease-in-out",
          zIndex: 0,
          "@keyframes pulse": {
            "0%": { opacity: 0.8, transform: "scale(1)" },
            "50%": { opacity: 0.3, transform: "scale(1.1)" },
            "100%": { opacity: 0.8, transform: "scale(1)" },
          },
        }}
      />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1500}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <motion.div variants={childVariants}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: 3,
                    mb: 1,
                    textTransform: "uppercase",
                  }}
                >
                  🎬 LGTV Cinema
                </Typography>
              </motion.div>
              <motion.div variants={childVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Đăng nhập để khám phá thế giới điện ảnh
                </Typography>
              </motion.div>
            </Box>

            {error && (
              <motion.div variants={childVariants}>
                <Typography
                  color="error"
                  align="center"
                  sx={{ mb: 2, fontWeight: 500 }}
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
                        <Email sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "#fff",
                      borderRadius: 2,
                    },
                  }}
                  InputLabelProps={{ sx: { color: "rgba(255, 255, 255, 0.6)" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#e50914",
                        transform: "scale(1.02)",
                      },
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
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="start"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "#fff",
                      borderRadius: 2,
                    },
                  }}
                  InputLabelProps={{ sx: { color: "rgba(255, 255, 255, 0.6)" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#e50914",
                        transform: "scale(1.02)",
                      },
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
                    mt: 3,
                    py: 1.5,
                    background: "linear-gradient(45deg, #e50914, #b81d24)",
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    "&:hover": {
                      background: "linear-gradient(45deg, #b81d24, #e50914)",
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(229, 9, 20, 0.5)",
                    },
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đăng nhập
                </Button>
              </motion.div>

              <motion.div variants={childVariants}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 2, color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#e50914",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#ff4d4d")}
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
