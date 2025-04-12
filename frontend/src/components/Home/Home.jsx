import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Skeleton,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TheatersIcon from "@mui/icons-material/Theaters";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PaymentIcon from "@mui/icons-material/Payment";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Hero Section - Tinh chỉnh với hình ảnh nhỏ hơn và giao diện hiện đại */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e3a8a 30%, #3b82f6 90%)",
          color: "white",
          py: { xs: 8, md: 10 },
          mb: 6,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle, transparent 20%, #000 70%)",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "2rem", md: "3rem" },
                    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                    animation: "fadeInUp 1s ease-out",
                  }}
                >
                  Chào mừng đến với
                  <br />
                  Đặt Vé Xem Phim
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                    animation: "fadeInUp 1s ease-out 0.3s both",
                  }}
                >
                  Khám phá thế giới điện ảnh với những bộ phim mới nhất
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/movies"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "25px",
                    background:
                      "linear-gradient(45deg, #ff6b6b 30%, #ff8e53 90%)",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    transition: "all 0.3s",
                    animation: "fadeInUp 1s ease-out 0.6s both",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 10px 4px rgba(255, 105, 135, .4)",
                    },
                  }}
                >
                  Xem Phim Đang Chiếu
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/images/movies/popcorn-movie-party-entertainment.webp"
                alt="Hero"
                sx={{
                  width: "100%",
                  maxWidth: "350px", // Thu nhỏ kích thước hình ảnh
                  height: "auto",
                  borderRadius: 6,
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  transform: "perspective(800px) rotateY(-10deg)",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "perspective(800px) rotateY(0deg)",
                  },
                  animation: "fadeInRight 1s ease-out",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Thiết kế gọn gàng và hiện đại hơn */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {[
            {
              icon: <LocalMoviesIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
              title: "Phim Mới Nhất",
              desc: "Luôn cập nhật các bộ phim hot nhất",
            },
            {
              icon: <TheatersIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
              title: "Đặt Vé Dễ Dàng",
              desc: "Chỉ vài bước để có vé xem phim",
            },
            {
              icon: <EventSeatIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
              title: "Chọn Ghế Linh Hoạt",
              desc: "Tự do chọn vị trí ghế yêu thích",
            },
            {
              icon: <PaymentIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
              title: "Thanh Toán An Toàn",
              desc: "Hỗ trợ nhiều phương thức thanh toán",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  background:
                    "linear-gradient(to bottom, #fff 0%, #f9fafb 100%)",
                  transition: "all 0.3s ease",
                  animation: `fadeInUp 0.5s ease-out ${index * 0.2}s both`,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  {feature.icon}
                  <Typography variant="h6" fontWeight="600" color="#1e3a8a">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" fontSize="0.9rem">
                    {feature.desc}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Phim Nổi Bật Section - Tinh chỉnh để đẹp hơn */}
      <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: "600",
              color: "#1e3a8a",
            }}
          >
            Phim Nổi Bật
          </Typography>

          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Skeleton
                      variant="rectangular"
                      height={350}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                ))
              : movies.slice(0, 4).map((movie) => (
                  <Grid item xs={12} sm={6} md={3} key={movie.id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="300" // Giảm chiều cao hình ảnh trong card
                          image={
                            movie.imageUrl || "/images/movies/default-movie.jpg"
                          }
                          alt={movie.title}
                          sx={{
                            objectFit: "cover",
                            borderTopLeftRadius: 3,
                            borderTopRightRadius: 3,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <IconButton
                            component={Link}
                            to={`/movies/${movie.id}`}
                            sx={{
                              color: "white",
                              transform: "scale(1.5)",
                              "&:hover": {
                                color: "#ff6b6b",
                              },
                            }}
                          >
                            <PlayCircleOutlineIcon fontSize="large" />
                          </IconButton>
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          noWrap
                          fontWeight="600"
                        >
                          {movie.title}
                        </Typography>

                        {/* Thêm phần hiển thị thể loại */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            flexWrap: "wrap",
                            mb: 1,
                          }}
                        >
                          {movie.genres?.map((genre) => (
                            <Chip
                              key={genre.id}
                              label={genre.name}
                              size="small"
                              sx={{
                                backgroundColor: "#e3f2fd",
                                color: "#1976d2",
                                fontSize: "0.75rem",
                                height: "24px",
                                "&:hover": {
                                  backgroundColor: "#bbdefb",
                                },
                              }}
                            />
                          ))}
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <AccessTimeIcon
                            sx={{
                              fontSize: 18,
                              mr: 1,
                              color: "text.secondary",
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {movie.duration} phút
                          </Typography>
                        </Box>
                        <Chip
                          label="Đang chiếu"
                          color="primary"
                          size="small"
                          sx={{ mt: 1, bgcolor: "#3b82f6" }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/movies"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "25px",
                textTransform: "none",
                fontSize: "1rem",
                borderColor: "#3b82f6",
                color: "#3b82f6",
                "&:hover": {
                  bgcolor: "#3b82f6",
                  color: "white",
                  borderColor: "#3b82f6",
                },
              }}
            >
              Xem tất cả phim
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
