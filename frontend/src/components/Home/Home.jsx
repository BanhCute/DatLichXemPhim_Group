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
import { motion } from "framer-motion";

// Tạo MotionButton
const MotionButton = motion(Button);

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

  // Hiệu ứng chuyển động
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(229, 9, 20, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      sx={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)", // Đặt nền tổng thể tối
        backgroundSize: "200%",
        animation: "gradientBackground 10s ease infinite",
        minHeight: "100vh", // Đảm bảo nền bao phủ toàn bộ trang
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          color: "white",
          py: { xs: 10, md: 12 },
          mb: 8,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.03), transparent 70%)",
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <motion.div variants={childVariants}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "2.5rem", md: "4rem" },
                        color: "transparent",
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        background:
                          "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                        backgroundSize: "200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientText 3s ease infinite",
                        textShadow: "0 0 20px rgba(229, 9, 20, 0.7)",
                      }}
                    >
                      Welcome to
                      <br />
                      LGTV Cenima
                    </Typography>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 2,
                        mb: 4,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        opacity: 0.9,
                        color: "rgba(255, 255, 255, 0.8)",
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      Khám phá thế giới điện ảnh với những bộ phim mới nhất
                    </Typography>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <MotionButton
                      variant="contained"
                      size="large"
                      component={Link}
                      to="/movies"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: "25px",
                        background:
                          "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                        backgroundSize: "200%",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                        animation: "neonGlow 2s ease-in-out infinite",
                        "&:hover": {
                          backgroundPosition: "100% 50%",
                          textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                        },
                      }}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Xem Phim Đang Chiếu
                    </MotionButton>
                  </motion.div>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <motion.div
                  variants={childVariants}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      "&:hover .overlay": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/anhNen/rapPhim.jpg"
                      alt="Hero"
                      sx={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "auto",
                        borderRadius: 6,
                        boxShadow: "0 6px 20px rgba(229, 9, 20, 0.3)",
                        transform: "perspective(800px) rotateY(-10deg)",
                        transition: "transform 0.5s ease, box-shadow 0.3s ease, scale 0.3s ease",
                        "&:hover": {
                          transform: "perspective(800px) rotateY(0deg) scale(1.05)",
                          boxShadow: "0 10px 30px rgba(229, 9, 20, 0.5)",
                        },
                      }}
                    />
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(45deg, rgba(229, 9, 20, 0.2), transparent)",
                        borderRadius: 6,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
  <motion.div variants={containerVariants} initial="hidden" animate="visible">
    <motion.div variants={childVariants}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          mb: 8,
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 800,
          color: "transparent",
          background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
          backgroundSize: "200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientText 3s ease infinite",
          textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
        }}
      >
        Tại sao chọn LGTV Cenima?
      </Typography>
    </motion.div>

    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "nowrap", // Ép 4 card nằm trên cùng một dòng
        overflowX: "auto", // Cho phép cuộn ngang trên mobile nếu không vừa
        scrollbarWidth: "none", // Ẩn thanh cuộn trên Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Ẩn thanh cuộn trên Chrome/Safari
        },
      }}
    >
      {[
        {
          icon: <LocalMoviesIcon sx={{ fontSize: 50, color: "#e50914" }} />,
          title: "Phim Mới Nhất",
          desc: "Luôn cập nhật các bộ phim hot nhất",
        },
        {
          icon: <TheatersIcon sx={{ fontSize: 50, color: "#e50914" }} />,
          title: "Đặt Vé Dễ Dàng",
          desc: "Chỉ vài bước để có vé xem phim",
        },
        {
          icon: <EventSeatIcon sx={{ fontSize: 50, color: "#e50914" }} />,
          title: "Chọn Ghế Linh Hoạt",
          desc: "Tự do chọn vị trí ghế yêu thích",
        },
        {
          icon: <PaymentIcon sx={{ fontSize: 50, color: "#e50914" }} />,
          title: "Thanh Toán An Toàn",
          desc: "Hỗ trợ nhiều phương thức thanh toán",
        },
      ].map((feature, index) => (
        <Grid item xs={3} key={index}>
          <motion.div
            variants={childVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 4 },
                height: "100%",
                minWidth: "150px", // Đảm bảo card không bị co quá nhỏ
                maxWidth: "250px", // Giới hạn chiều rộng tối đa để tránh tràn
                borderRadius: 3,
                background: "linear-gradient(45deg, rgba(229, 9, 20, 0.1), transparent)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(229, 9, 20, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  background: "linear-gradient(45deg, rgba(229, 9, 20, 0.2), transparent)",
                  boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
                },
              }}
            >
              <Stack spacing={2} alignItems="center" textAlign="center">
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <Typography
                  variant="h6"
                  fontFamily="'Roboto', sans-serif"
                  fontWeight={800}
                  sx={{
                    color: "transparent",
                    background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradientText 3s ease infinite",
                    textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  fontFamily="'Roboto', sans-serif"
                  fontWeight={500}
                  color="#fff"
                  fontSize="0.9rem"
                  sx={{
                    textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  {feature.desc}
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </motion.div>
</Container>

      {/* Phim Nổi Bật Section */}
      <Box
        sx={{
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants}>
  <Typography
    variant="h4"
    component="h2"
    sx={{
      textAlign: "center",
      mb: 8,
      fontFamily: "'Roboto', sans-serif", // Thay Poppins bằng Roboto
      fontWeight: 800,
      color: "transparent",
      background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
      backgroundSize: "200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradientText 3s ease infinite",
      textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
    }}
  >
    Phim Nổi Bật
  </Typography>
</motion.div>
            <Grid container spacing={3}>
              {loading
                ? Array.from(new Array(4)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Skeleton
                        variant="rectangular"
                        height={400}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                  ))
                : movies.slice(0, 4).map((movie) => (
                    <Grid item xs={12} sm={6} md={3} key={movie.id}>
                      <motion.div variants={childVariants}>
                        <Card
                          sx={{
                            height: "100%",
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.03)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            transition: "all 0.3s",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 8px 20px rgba(229, 9, 20, 0.3)",
                            },
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <CardMedia
                              component="img"
                              height="320"
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
                                bgcolor: "rgba(0,0,0,0.5)",
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
                              <motion.div
                                whileHover={{
                                  scale: 1.2,
                                  textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                                }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <IconButton
                                  component={Link}
                                  to={`/movies/${movie.id}`}
                                  sx={{
                                    color: "white",
                                    transform: "scale(1.5)",
                                    "&:hover": {
                                      color: "#e50914",
                                    },
                                  }}
                                >
                                  <PlayCircleOutlineIcon fontSize="large" />
                                </IconButton>
                              </motion.div>
                            </Box>
                          </Box>
                          <CardContent sx={{ color: "#fff" }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              noWrap
                              fontFamily="'Poppins', sans-serif"
                              fontWeight={800}
                              sx={{
                                textShadow: "0 0 10px rgba(229, 9, 20, 0.3)",
                              }}
                            >
                              {movie.title}
                            </Typography>

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
                                    background: "rgba(229, 9, 20, 0.2)",
                                    color: "#fff",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "0.75rem",
                                    height: "24px",
                                    "&:hover": {
                                      background: "rgba(229, 9, 20, 0.4)",
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
                                  color: "rgba(255, 255, 255, 0.7)",
                                }}
                              />
                              <Typography
                                variant="body2"
                                fontFamily="'Inter', sans-serif"
                                fontWeight={500}
                                color="rgba(255, 255, 255, 0.7)"
                              >
                                {movie.duration} phút
                              </Typography>
                            </Box>
                            <Chip
                              label="Đang chiếu"
                              size="small"
                              sx={{
                                mt: 1,
                                background: "rgba(229, 9, 20, 0.5)",
                                color: "#fff",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                              }}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
            </Grid>

            <motion.div variants={childVariants}>
              <Box sx={{ textAlign: "center", mt: 8 }}>
                <MotionButton
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
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    borderColor: "#e50914",
                    color: "#e50914",
                    "&:hover": {
                      background: "rgba(229, 9, 20, 0.2)",
                      borderColor: "#e50914",
                      color: "#e50914",
                      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    },
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Xem tất cả phim
                </MotionButton>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* CSS Animations */}
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
          @keyframes neonGlow {
            0% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
            50% { box-shadow: 0 0 30px rgba(229, 9, 20, 0.8); }
            100% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;