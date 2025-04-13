import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentIcon from "@mui/icons-material/Payment";
import { motion } from "framer-motion";

// Tạo MotionButton
const MotionButton = motion(Button);

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải thông tin đặt vé");
        }

        const data = await response.json();
        setBooking(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const getPaymentMethodLabel = (method) => {
    switch (method?.toUpperCase()) {
      case "CASH":
        return "Tiền mặt";
      case "PAYPAL":
        return "PayPal";
      case "CREDIT_CARD":
        return "Thẻ tín dụng";
      default:
        return "Không xác định";
    }
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
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
          minHeight: "90vh",
          py: 4,
        }}
      >
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 9, 20, 0.3)",
              borderRadius: 3,
              color: "#e50914",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
            }}
          >
            <Typography>{error}</Typography>
          </Paper>
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
      <Container maxWidth="md">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 9, 20, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
              },
            }}
          >
            <motion.div variants={childVariants}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 80,
                    color: "#4CAF50",
                    mb: 2,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
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
                    mb: 1,
                  }}
                >
                  Đặt vé thành công!
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  Cảm ơn bạn đã đặt vé tại Rạp phim LGTV
                </Typography>
              </Box>
            </motion.div>

            <Divider sx={{ my: 3, borderColor: "rgba(229, 9, 20, 0.3)" }} />

            {booking && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <motion.div variants={childVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <MovieIcon sx={{ mr: 2, color: "#e50914" }} />
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
                        }}
                      >
                        {booking.showTime?.movie?.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3, ml: 5 }}>
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
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={childVariants}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        p: 2,
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <AccessTimeIcon sx={{ mr: 1, color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                          Suất chiếu: {new Date(booking.showTime?.startTime).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <MeetingRoomIcon sx={{ mr: 1, color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                          Phòng: {booking.showTime?.room}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventSeatIcon sx={{ mr: 1, color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                          Ghế: {booking.seats?.map((seat) => seat.number).join(", ")}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={childVariants}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        p: 2,
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <ConfirmationNumberIcon sx={{ mr: 1, color: "#e50914" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 500,
                            color: "#e50914",
                            textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                          }}
                        >
                          Tổng tiền: {booking.totalPrice.toLocaleString()}đ
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                            label={getPaymentMethodLabel(booking.payments?.[0]?.method)}
                            size="small"
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: 500,
                              background:
                                booking.payments?.[0]?.method === "CASH"
                                  ? "rgba(102, 187, 106, 0.5)"
                                  : booking.payments?.[0]?.method === "PAYPAL"
                                  ? "rgba(33, 150, 243, 0.5)"
                                  : booking.payments?.[0]?.method === "CREDIT_CARD"
                                  ? "rgba(156, 39, 176, 0.5)"
                                  : "rgba(158, 158, 158, 0.5)",
                              color: "#fff",
                              "&:hover": {
                                boxShadow:
                                  booking.payments?.[0]?.method === "CASH"
                                    ? "0 0 10px rgba(102, 187, 106, 0.7)"
                                    : booking.payments?.[0]?.method === "PAYPAL"
                                    ? "0 0 10px rgba(33, 150, 243, 0.7)"
                                    : booking.payments?.[0]?.method === "CREDIT_CARD"
                                    ? "0 0 10px rgba(156, 39, 176, 0.7)"
                                    : "0 0 10px rgba(158, 158, 158, 0.7)",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      {booking.promotion && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalOfferIcon sx={{ mr: 1, color: "#4CAF50" }} />
                          <Typography
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: 500,
                              color: "#4CAF50",
                              textShadow: "0 0 5px rgba(76, 175, 80, 0.5)",
                            }}
                          >
                            Đã áp dụng mã giảm giá: {booking.promotion.code}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            )}

            <motion.div variants={childVariants}>
              <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <MotionButton
                  component={Link}
                  to="/bookings"
                  variant="contained"
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
                  startIcon={<ConfirmationNumberIcon />}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Xem lịch sử đặt vé
                </MotionButton>
                <MotionButton
                  component={Link}
                  to="/movies"
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontFamily: "'Roboto', sans-serif",
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
                  startIcon={<MovieIcon />}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Tiếp tục đặt vé
                </MotionButton>
              </Box>
            </motion.div>
          </Paper>
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

export default BookingSuccess;