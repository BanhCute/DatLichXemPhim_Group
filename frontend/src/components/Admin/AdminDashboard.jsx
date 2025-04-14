import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Tabs,
  Tab,
  Box,
  Fade,
  CircularProgress,
  useTheme,
  Avatar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/admin");
        break;
      case 1:
        navigate("/admin/movies");
        break;
      case 2:
        navigate("/admin/genres");
        break;
      case 3:
        navigate("/admin/users");
        break;
      case 4:
        navigate("/admin/bookings");
        break;
      case 5:
        navigate("/admin/showtimes");
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      title: "Quản lý Phim",
      icon: <MovieIcon />,
      description: "Thêm, sửa, xóa phim và quản lý thông tin phim",
      link: "/admin/movies",
      gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
      iconColor: "#FF416C",
      stats: "50+ Phim",
    },
    {
      title: "Quản lý Thể Loại",
      icon: <CategoryIcon />,
      description: "Quản lý các thể loại phim",
      link: "/admin/genres",
      gradient: "linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)",
      iconColor: "#4E65FF",
      stats: "15 Thể loại",
    },
    {
      title: "Quản lý Người Dùng",
      icon: <PeopleIcon />,
      description: "Quản lý thông tin và phân quyền người dùng",
      link: "/admin/users",
      gradient: "linear-gradient(135deg, #45B649 0%, #DCE35B 100%)",
      iconColor: "#45B649",
      stats: "1000+ Users",
    },
    {
      title: "Quản lý Đặt Vé",
      icon: <ReceiptIcon />,
      description: "Xem và quản lý thông tin đặt vé của người dùng",
      link: "/admin/bookings",
      gradient: "linear-gradient(135deg, #FF8008 0%, #FFC837 100%)",
      iconColor: "#FF8008",
      stats: "500+ Đặt vé",
    },
    {
      title: "Quản lý Suất Chiếu",
      icon: <ShowChartIcon />,
      description: "Quản lý lịch chiếu phim tại các rạp",
      link: "/admin/showtimes",
      gradient: "linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)",
      iconColor: "#D04ED6",
      stats: "100+ Suất chiếu",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)",
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#fff" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Admin Navigation */}
        <Paper
          elevation={24}
          sx={{
            mb: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #e50914, #ff5722, #ff9800)",
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                color: "#37474f",
                textTransform: "none",
                fontSize: "1rem",
                padding: "16px 32px",
                transition: "all 0.3s ease",
                minHeight: "72px",
                "&:hover": {
                  color: "#e50914",
                  backgroundColor: "rgba(229, 9, 20, 0.08)",
                },
                "&.Mui-selected": {
                  color: "#e50914",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e50914",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              label="Dashboard"
              icon={<DashboardIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Phim"
              icon={<MovieIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Thể Loại"
              icon={<CategoryIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Người Dùng"
              icon={<PeopleIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Đặt Vé"
              icon={<ReceiptIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Suất Chiếu"
              icon={<ShowChartIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
              mb: 2,
            }}
          >
            Trang Quản Trị
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "'Roboto', sans-serif",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Quản lý hệ thống rạp phim một cách hiệu quả
          </Typography>
        </Box>

        {/* Menu Grid */}
        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Fade in timeout={800 + index * 200}>
                <Card
                  component={Link}
                  to={item.link}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    textDecoration: "none",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 48px rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      "& .card-icon": {
                        transform: "scale(1.1)",
                        color: item.iconColor,
                      },
                      "& .stats-chip": {
                        background: item.gradient,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: item.gradient,
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      p: 3,
                      flexGrow: 1,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      className="card-icon"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255, 255, 255, 0.1)",
                        transition: "all 0.4s ease",
                        mb: 2,
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: { fontSize: 32, transition: "all 0.4s ease" },
                      })}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        color: "#fff",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Box
                      className="stats-chip"
                      sx={{
                        alignSelf: "flex-start",
                        py: 1,
                        px: 2,
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.1)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#fff",
                        }}
                      >
                        {item.stats}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
