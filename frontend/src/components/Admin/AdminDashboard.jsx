import React, { useState } from "react";
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
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

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
      icon: (
        <MovieIcon
          sx={{ fontSize: 60, color: "#fff", transition: "all 0.3s ease" }}
        />
      ),
      description: "Thêm, sửa, xóa phim và quản lý thông tin phim",
      link: "/admin/movies",
      gradient: "linear-gradient(135deg, #e50914 0%, #b81d24 100%)",
    },
    {
      title: "Quản lý Thể Loại",
      icon: (
        <CategoryIcon
          sx={{ fontSize: 60, color: "#fff", transition: "all 0.3s ease" }}
        />
      ),
      description: "Quản lý các thể loại phim",
      link: "/admin/genres",
      gradient: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
    },
    {
      title: "Quản lý Người Dùng",
      icon: (
        <PeopleIcon
          sx={{ fontSize: 60, color: "#fff", transition: "all 0.3s ease" }}
        />
      ),
      description: "Quản lý thông tin và phân quyền người dùng",
      link: "/admin/users",
      gradient: "linear-gradient(135deg, #43a047 0%, #2e7d32 100%)",
    },
    {
      title: "Quản lý Đặt Vé",
      icon: (
        <ReceiptIcon
          sx={{ fontSize: 60, color: "#fff", transition: "all 0.3s ease" }}
        />
      ),
      description: "Xem và quản lý thông tin đặt vé của người dùng",
      link: "/admin/bookings",
      gradient: "linear-gradient(135deg, #fb8c00 0%, #ef6c00 100%)",
    },
    {
      title: "Quản lý Suất Chiếu",
      icon: (
        <ShowChartIcon
          sx={{ fontSize: 60, color: "#fff", transition: "all 0.3s ease" }}
        />
      ),
      description: "Quản lý lịch chiếu phim tại các rạp",
      link: "/admin/showtimes",
      gradient: "linear-gradient(135deg, #8e24aa 0%, #6a1b9a 100%)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Admin Navigation */}
        <Paper
          sx={{
            mb: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "medium",
                color: "#444",
                textTransform: "none",
                fontSize: "1.1rem",
                padding: "14px 28px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#e50914",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                },
                "&.Mui-selected": {
                  color: "#e50914",
                  fontWeight: "bold",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e50914",
                height: 4,
                borderRadius: "4px 4px 0 0",
              },
            }}
          >
            <Tab label="DASHBOARD" icon={<ShowChartIcon />} />
            <Tab label="QUẢN LÝ PHIM" icon={<MovieIcon />} />
            <Tab label="QUẢN LÝ THỂ LOẠI" icon={<CategoryIcon />} />
            <Tab label="QUẢN LÝ NGƯỜI DÙNG" icon={<PeopleIcon />} />
            <Tab label="QUẢN LÝ ĐẶT VÉ" icon={<ReceiptIcon />} />
            <Tab label="QUẢN LÝ SUẤT CHIẾU" icon={<ShowChartIcon />} />
          </Tabs>
        </Paper>

        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            mb: 8,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          Trang Quản Trị
        </Typography>

        {/* Menu Grid */}
        <Grid container spacing={6}>
          {menuItems.map((item, index) =>
            item ? (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in timeout={800 + index * 300}>
                  <div>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        background:
                          item.gradient ||
                          "linear-gradient(135deg, #e50914 0%, #b81d24 100%)",
                        color: "white",
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.5s ease, box-shadow 0.5s ease",
                        "&:hover": {
                          transform: "translateY(-12px)",
                          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
                          "& .MuiSvgIcon-root": {
                            transform: "scale(1.2)",
                            color: "#ffeb3b",
                          },
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          p: 5,
                          flexGrow: 1,
                        }}
                      >
                        {item.icon || (
                          <MovieIcon sx={{ fontSize: 60, color: "#fff" }} />
                        )}
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            mt: 3,
                            fontWeight: "bold",
                            fontFamily: "'Poppins', sans-serif",
                            color: "#fff",
                          }}
                        >
                          {item.title || "Untitled"}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mt: 2,
                            mb: 4,
                            color: "rgba(255, 255, 255, 0.9)",
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "1rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description || "No description available"}
                        </Typography>
                        <Button
                          component={Link}
                          to={item.link || "/admin"}
                          variant="contained"
                          sx={{
                            mt: "auto",
                            backgroundColor: "#fff",
                            color: "#e50914",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 2,
                            padding: "12px 28px",
                            fontFamily: "'Roboto', sans-serif",
                            transition: "all 0.4s ease",
                            "&:hover": {
                              backgroundColor: "#e50914",
                              color: "#fff",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          Truy cập
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </Fade>
              </Grid>
            ) : null
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
