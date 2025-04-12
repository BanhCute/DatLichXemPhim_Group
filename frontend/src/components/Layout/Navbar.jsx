import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setIsAdmin(userRole === "ADMIN");
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hiệu ứng chuyển động cho các nút
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(229, 9, 20, 0.5)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  // Hiệu ứng cho container và các thành phần con
  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
        backgroundSize: "200%",
        animation: "gradientBackground 10s ease infinite",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        py: 1,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 30px rgba(229, 9, 20, 0.3)",
        },
      }}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <motion.div variants={childVariants}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif", // Font mới cho logo
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "transparent",
                letterSpacing: 3,
                textTransform: "uppercase",
                background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#e50914", // Fallback
                animation: "gradientText 3s ease infinite",
                textShadow: "0 0 20px rgba(229, 9, 20, 0.7), 0 0 40px rgba(229, 9, 20, 0.3)",
                display: "flex",
                alignItems: "center",
              }}
            >
              🎬 LGTV CENIMA
            </Typography>
          </Link>
        </motion.div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.div variants={childVariants}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                component={motion.button}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  mx: 1.5,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif", // Font mới cho nút
                  textTransform: "none",
                  fontSize: "1rem",
                  textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  "&:hover": {
                    color: "#e50914",
                    textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                      animation: "ripple 1s ease-out",
                    },
                  },
                }}
              >
                Trang chủ
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={childVariants}>
            <Link to="/movies" style={{ textDecoration: "none" }}>
              <Button
                component={motion.button}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  mx: 1.5,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif", // Font mới cho nút
                  textTransform: "none",
                  fontSize: "1rem",
                  textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  "&:hover": {
                    color: "#e50914",
                    textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                      animation: "ripple 1s ease-out",
                    },
                  },
                }}
              >
                Phim
              </Button>
            </Link>
          </motion.div>

          {isLoggedIn && isAdmin && (
            <motion.div variants={childVariants}>
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Button
                  component={motion.button}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mx: 1.5,
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif", // Font mới cho nút
                    textTransform: "none",
                    fontSize: "1rem",
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
                    position: "relative",
                    "&:hover": {
                      color: "#e50914",
                      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                        animation: "ripple 1s ease-out",
                      },
                    },
                  }}
                >
                  Trang quản trị
                </Button>
              </Link>
            </motion.div>
          )}

          {isLoggedIn ? (
            <>
              <motion.div variants={childVariants}>
                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClick}
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    "&:hover": {
                      color: "#e50914",
                      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    },
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </motion.div>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
                    backgroundSize: "200%",
                    animation: "gradientBackground 10s ease infinite",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    minWidth: 220,
                    borderRadius: 2,
                    overflow: "hidden",
                  },
                }}
                PaperProps={{
                  component: motion.div,
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
              >
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      py: 1.5,
                      fontFamily: "'Inter', sans-serif", // Font mới cho menu item
                      "&:hover": {
                        color: "#e50914",
                        background: "rgba(229, 9, 20, 0.1)",
                        textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                      },
                    }}
                  >
                    <PersonIcon sx={{ mr: 1 }} /> Hồ sơ
                  </MenuItem>
                </Link>
                <Link to="/bookings" style={{ textDecoration: "none" }}>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      py: 1.5,
                      fontFamily: "'Inter', sans-serif", // Font mới cho menu item
                      "&:hover": {
                        color: "#e50914",
                        background: "rgba(229, 9, 20, 0.1)",
                        textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                      },
                    }}
                  >
                    <HistoryIcon sx={{ mr: 1 }} /> Lịch sử đặt vé
                  </MenuItem>
                </Link>
                {isAdmin && (
                  <Link to="/admin" style={{ textDecoration: "none" }}>
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        py: 1.5,
                        fontFamily: "'Inter', sans-serif", // Font mới cho menu item
                        "&:hover": {
                          color: "#e50914",
                          background: "rgba(229, 9, 20, 0.1)",
                          textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                        },
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1 }} /> Trang quản trị
                    </MenuItem>
                  </Link>
                )}
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                  sx={{
                    py: 1.5,
                    fontFamily: "'Inter', sans-serif", // Font mới cho menu item
                    "&:hover": {
                      color: "#e50914",
                      background: "rgba(229, 9, 20, 0.1)",
                      textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                    },
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <motion.div variants={childVariants}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    component={motion.button}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      mx: 1.5,
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif", // Font mới cho nút
                      textTransform: "none",
                      fontSize: "1rem",
                      textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
                      position: "relative",
                      "&:hover": {
                        color: "#e50914",
                        textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={childVariants}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    component={motion.button}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      mx: 1.5,
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif", // Font mới cho nút
                      textTransform: "none",
                      fontSize: "1rem",
                      textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
                      position: "relative",
                      "&:hover": {
                        color: "#e50914",
                        textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                          animation: "ripple 1s ease-out",
                        },
                      },
                    }}
                  >
                    Đăng ký
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </Box>
      </Toolbar>
      <style>
        {`
          @keyframes gradientBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes gradientText {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes ripple {
            0% { transform: scaleX(0); opacity: 1; }
            100% { transform: scaleX(1); opacity: 0; }
          }
        `}
      </style>
    </AppBar>
  );
};

export default Navbar;