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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255, 65, 108, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 15 },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at center, rgba(255,65,108,0.15) 0%, rgba(10,10,10,0) 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={childVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "3rem", md: "4.5rem" },
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      textShadow: "0 0 30px rgba(255,65,108,0.3)",
                      mb: 3,
                    }}
                  >
                    LGTV Cinema
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                      mb: 4,
                      textShadow: "0 0 20px rgba(255,255,255,0.2)",
                    }}
                  >
                    Trải Nghiệm Điện Ảnh Đỉnh Cao
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      color: "rgba(255,255,255,0.7)",
                      mb: 6,
                      maxWidth: "600px",
                      lineHeight: 1.8,
                    }}
                  >
                    Khám phá thế giới điện ảnh với những bộ phim bom tấn mới
                    nhất cùng trải nghiệm âm thanh và hình ảnh tuyệt đỉnh tại
                    LGTV Cinema.
                  </Typography>
                  <Stack direction="row" spacing={3}>
                    <MotionButton
                      component={Link}
                      to="/movies"
                      variant="contained"
                      size="large"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: "30px",
                        background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "0 10px 20px rgba(255,65,108,0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #FF4B2B, #FF416C)",
                        },
                      }}
                    >
                      Đặt Vé Ngay
                    </MotionButton>
                  </Stack>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={childVariants}
                  style={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "120%",
                      height: "120%",
                      background:
                        "radial-gradient(circle, rgba(255,65,108,0.2) 0%, transparent 70%)",
                      transform: "translate(-50%, -50%)",
                      zIndex: -1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/anhNen/rapPhim.jpg"
                    alt="Cinema"
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                      transform: "perspective(1000px) rotateY(-15deg)",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        transform:
                          "perspective(1000px) rotateY(0deg) scale(1.05)",
                        boxShadow: "0 30px 60px rgba(255,65,108,0.3)",
                      },
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 800,
              background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 20px rgba(255,65,108,0.3)",
            }}
          >
            Tại Sao Chọn LGTV Cinema?
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: (
                  <LocalMoviesIcon sx={{ fontSize: 40, color: "#FF416C" }} />
                ),
                title: "Phim Mới Nhất",
                desc: "Cập nhật liên tục các bộ phim bom tấn",
              },
              {
                icon: <TheatersIcon sx={{ fontSize: 40, color: "#FF416C" }} />,
                title: "Công Nghệ Hiện Đại",
                desc: "Âm thanh và hình ảnh chất lượng cao",
              },
              {
                icon: <EventSeatIcon sx={{ fontSize: 40, color: "#FF416C" }} />,
                title: "Ghế Ngồi Thoải Mái",
                desc: "Thiết kế hiện đại, thoải mái tối đa",
              },
              {
                icon: <PaymentIcon sx={{ fontSize: 40, color: "#FF416C" }} />,
                title: "Đặt Vé Dễ Dàng",
                desc: "Thanh toán nhanh chóng, an toàn",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={childVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        background: "rgba(255,65,108,0.1)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Stack spacing={3} alignItems="center" textAlign="center">
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "50%",
                          background: "rgba(255,65,108,0.1)",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
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

      {/* Movies Section */}
      <Box sx={{ py: 10, background: "rgba(0,0,0,0.3)" }}>
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 8,
                fontWeight: 800,
                background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 20px rgba(255,65,108,0.3)",
              }}
            >
              Phim Đang Chiếu
            </Typography>

            <Grid container spacing={4}>
              {loading
                ? Array.from(new Array(4)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Skeleton
                        variant="rectangular"
                        height={550}
                        sx={{
                          borderRadius: "20px",
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />
                    </Grid>
                  ))
                : movies.slice(0, 4).map((movie) => (
                    <Grid item xs={12} sm={6} md={3} key={movie.id}>
                      <motion.div variants={childVariants}>
                        <Card
                          sx={{
                            height: 500,
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                              transform: "translateY(-10px)",
                              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                            },
                          }}
                        >
                          <Box sx={{ position: "relative", height: 350 }}>
                            <CardMedia
                              component="img"
                              height="350"
                              image={
                                movie.imageUrl ||
                                "/images/movies/default-movie.jpg"
                              }
                              alt={movie.title}
                              sx={{
                                objectFit: "cover",
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                  opacity: 1,
                                },
                              }}
                            >
                              <IconButton
                                component={Link}
                                to={`/movies/${movie.id}`}
                                sx={{
                                  color: "#FF416C",
                                  "&:hover": {
                                    transform: "scale(1.2)",
                                  },
                                }}
                              >
                                <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
                              </IconButton>
                            </Box>
                          </Box>
                          <CardContent
                            sx={{
                              p: 2.5,
                              flexGrow: 1,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: 150,
                              background: "rgba(0,0,0,0.3)",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "white",
                                  fontWeight: 700,
                                  mb: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: 1.3,
                                  fontSize: "0.95rem",
                                }}
                              >
                                {movie.title}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                mb={1}
                              >
                                <AccessTimeIcon
                                  sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "1.1rem",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {movie.duration} phút
                                </Typography>
                              </Stack>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                flexWrap: "wrap",
                                maxHeight: "40px",
                                overflow: "hidden",
                              }}
                            >
                              {movie.genres?.map((genre) => (
                                <Chip
                                  key={genre.id}
                                  label={genre.name}
                                  size="small"
                                  sx={{
                                    bgcolor: "rgba(255,65,108,0.15)",
                                    color: "#FF416C",
                                    borderRadius: "8px",
                                    height: "22px",
                                    "& .MuiChip-label": {
                                      fontSize: "0.7rem",
                                      px: 1,
                                    },
                                  }}
                                />
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 8 }}>
              <MotionButton
                component={Link}
                to="/movies"
                variant="contained"
                size="large"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: "30px",
                  background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(255,65,108,0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
                  },
                }}
              >
                Xem Tất Cả Phim
              </MotionButton>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
