import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#141414",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
        py: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#e50914",
            letterSpacing: 1.5,
            fontFamily: "'Poppins', sans-serif",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "#ff4d4d",
              transition: "color 0.3s ease",
            },
          }}
          component={Link}
          to="/"
        >
          🎬 RẠP PHIM LGTV
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              mx: 1.5,
              fontWeight: 500,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                color: "#e50914",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Trang chủ
          </Button>
          <Button
            component={Link}
            to="/movies"
            sx={{
              color: "#fff",
              mx: 1.5,
              fontWeight: 500,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                color: "#e50914",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Phim
          </Button>

          {isLoggedIn && isAdmin && (
            <Button
              component={Link}
              to="/admin"
              sx={{
                color: "#fff",
                mx: 1.5,
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  color: "#e50914",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Trang quản trị
            </Button>
          )}

          {isLoggedIn ? (
            <>
              <IconButton
                onClick={handleClick}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "#e50914",
                  },
                }}
              >
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#141414",
                    color: "#fff",
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                  sx={{
                    "&:hover": { color: "#e50914" },
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} /> Hồ sơ
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/bookings"
                  onClick={handleClose}
                  sx={{
                    "&:hover": { color: "#e50914" },
                  }}
                >
                  <HistoryIcon sx={{ mr: 1 }} /> Lịch sử đặt vé
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin"
                  onClick={handleClose}
                  sx={{
                    "&:hover": { color: "#e50914" },
                  }}
                >
                  <DashboardIcon sx={{ mr: 1 }} /> Trang quản trị
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                  sx={{
                    "&:hover": { color: "#e50914" },
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  mx: 1.5,
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#e50914",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                Đăng nhập
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#fff",
                  mx: 1.5,
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#e50914",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
