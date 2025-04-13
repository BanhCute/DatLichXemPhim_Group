import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TheatersIcon from "@mui/icons-material/Theaters";
import dayjs from "dayjs";
import { motion } from "framer-motion";

// Tạo MotionButton
const MotionButton = motion(Button);

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Using token:", token);

      if (!token) {
        throw new Error("Vui lòng đăng nhập");
      }

      const response = await fetch("http://localhost:5000/api/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Không thể tải lịch sử đặt vé");
      }

      if (!data.data) {
        throw new Error("Dữ liệu không hợp lệ");
      }

      setBookings(data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error in fetchBookings:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getPaymentMethodLabel = (booking) => {
    if (booking.payments && booking.payments.length > 0) {
      const method = booking.payments[0].method;
      switch (method) {
        case "CASH":
          return "Tiền mặt";
        case "PAYPAL":
          return "PayPal";
        case "CREDIT_CARD":
          return "Thẻ tín dụng";
        default:
          return "Không xác định";
      }
    }
    return "Tiền mặt";
  };

  const paymentIcons = {
    CASH: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    CREDIT_CARD: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    PAYPAL: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
        }}
      >
        <CircularProgress sx={{ color: "#e50914" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
          minHeight: "80vh",
        }}
      >
        <Typography sx={{ color: "#e50914", fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Box
        sx={{
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
          minHeight: "90vh",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(229, 9, 20, 0.3)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
                },
              }}
            >
              <motion.div variants={childVariants}>
                <TheatersIcon sx={{ fontSize: 60, color: "#e50914", mb: 2 }} />
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
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
                  Bạn chưa có đơn đặt vé nào
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  Hãy đặt vé để thưởng thức những bộ phim hấp dẫn
                </Typography>
                <MotionButton
                  variant="contained"
                  href="/movies"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
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
                  Đặt vé ngay
                </MotionButton>
              </motion.div>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
        backgroundSize: "200%",
        animation: "gradientBackground 10s ease infinite",
        minHeight: "90vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <LocalActivityIcon sx={{ fontSize: 40, color: "#e50914", mr: 2 }} />
              <Typography
                variant="h4"
                sx={{
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
                Lịch sử đặt vé
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid item xs={12} key={booking.id}>
                <motion.div variants={childVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      display: "flex",
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(229, 9, 20, 0.3)",
                      borderRadius: 3,
                      color: "white",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: 120, sm: 200 },
                        height: "100%",
                        objectFit: "cover",
                        boxShadow: "0 6px 20px rgba(229, 9, 20, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 10px 30px rgba(229, 9, 20, 0.5)",
                        },
                      }}
                      image={booking.showTime?.movie?.imageUrl || "/default-movie.jpg"}
                      alt={booking.showTime?.movie?.title}
                    />
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: 800,
                              color: "transparent",
                              background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                              backgroundSize: "200%",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              animation: "gradientText 3s ease infinite",
                              textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                              mb: 1,
                            }}
                          >
                            {booking.showTime?.movie?.title}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {booking.showTime?.movie?.genres?.map((genre) => (
                              <Chip
                                key={genre.id}
                                label={genre.name}
                                size="small"
                                sx={{
                                  fontFamily: "'Roboto', sans-serif",
                                  fontWeight: 500,
                                  background: "rgba(229, 9, 20, 0.2)",
                                  color: "#fff",
                                  "&:hover": {
                                    background: "rgba(229, 9, 20, 0.4)",
                                    boxShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Chip
                          label={
                            booking.status === "PENDING"
                              ? "Chờ xác nhận"
                              : booking.status === "CONFIRMED"
                              ? "Đã xác nhận"
                              : "Đã hủy"
                          }
                          sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 500,
                            backgroundColor:
                              booking.status === "PENDING"
                                ? "rgba(255, 167, 38, 0.5)"
                                : booking.status === "CONFIRMED"
                                ? "rgba(102, 187, 106, 0.5)"
                                : "rgba(239, 83, 80, 0.5)",
                            color: "#fff",
                            px: 2,
                            "&:hover": {
                              boxShadow:
                                booking.status === "PENDING"
                                  ? "0 0 10px rgba(255, 167, 38, 0.7)"
                                  : booking.status === "CONFIRMED"
                                  ? "0 0 10px rgba(102, 187, 106, 0.7)"
                                  : "0 0 10px rgba(239, 83, 80, 0.7)",
                            },
                          }}
                        />
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              borderRadius: 1,
                              p: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <AccessTimeIcon sx={{ mr: 1, color: "#e50914" }} />
                              <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                                {dayjs(booking.showTime?.startTime).format("HH:mm - DD/MM/YYYY")}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <EventSeatIcon sx={{ mr: 1, color: "#e50914" }} />
                              <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                                Ghế: {booking.seats?.map((seat) => seat.number).join(", ")}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              borderRadius: 1,
                              p: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <MovieIcon sx={{ mr: 1, color: "#e50914" }} />
                              <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                                Phòng: {booking.showTime?.room}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <PaymentIcon sx={{ mr: 1, color: "#e50914" }} />
                              <Typography
                                variant="h6"
                                sx={{
                                  fontFamily: "'Roboto', sans-serif",
                                  fontWeight: 500,
                                  color: "#e50914",
                                  textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                                }}
                              >
                                {booking.totalPrice?.toLocaleString()}đ
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      {booking.promotion && (
                        <Box sx={{ mt: 2 }}>
                          <Chip
                            label={`Giảm ${booking.promotion.discount}% - ${booking.promotion.code}`}
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: 500,
                              background: "rgba(229, 9, 20, 0.5)",
                              color: "#fff",
                              "&:hover": {
                                background: "rgba(229, 9, 20, 0.7)",
                                boxShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                              },
                            }}
                          />
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 1,
                          p: 1.5,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            component="img"
                            src={paymentIcons[booking.payments?.[0]?.method] || paymentIcons.CASH}
                            alt="Payment method"
                            sx={{
                              width: 24,
                              height: 24,
                              objectFit: "contain",
                              filter: "drop-shadow(0 0 5px rgba(229, 9, 20, 0.5))",
                            }}
                          />
                          <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                            Thanh toán qua:
                          </Typography>
                          <Chip
                            label={getPaymentMethodLabel(booking)}
                            size="small"
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: 500,
                              background: "rgba(229, 9, 20, 0.5)",
                              color: "#fff",
                              "&:hover": {
                                background: "rgba(229, 9, 20, 0.7)",
                                boxShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

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

export default BookingHistory;