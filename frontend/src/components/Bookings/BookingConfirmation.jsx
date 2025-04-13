import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Chip,
  TextField,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MovieIcon from "@mui/icons-material/Movie";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { motion } from "framer-motion";

// Tạo MotionButton
const MotionButton = motion(Button);

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showTimeId, selectedSeats, showTime, movieInfo, totalPrice } = location.state || {};

  const [promoCode, setPromoCode] = useState("");
  const [promotion, setPromotion] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  // Thêm các đường dẫn hình ảnh
  const paymentIcons = {
    CASH: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    CREDIT_CARD: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    PAYPAL: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkPromoCode = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/promotions/check/${promoCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Mã giảm giá không hợp lệ");
      }

      const data = await response.json();
      setPromotion(data.data);
      setPromoError("");
    } catch (error) {
      setPromotion(null);
      setPromoError(error.message);
    }
  };

  const calculateFinalPrice = () => {
    if (!promotion) return totalPrice;
    const discount = totalPrice * (promotion.discount / 100);
    return totalPrice - discount;
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookingData = {
        showTimeId: showTime.id,
        seatNumbers: selectedSeats.map((seat) => seat.number),
        promotionCode: promoCode || null,
        paymentMethod: paymentMethod,
      };

      const response = await fetch("http://localhost:5000/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể đặt vé");
      }

      const data = await response.json();
      if (data.success) {
        navigate(`/booking/success/${data.data.id}`);
      } else {
        throw new Error(data.message || "Đặt vé không thành công");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setPromoError(error.message);
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
        background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
        backgroundSize: "200%",
        animation: "gradientBackground 10s ease infinite",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
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
            {/* Tiêu đề */}
            <motion.div variants={childVariants}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <MovieIcon sx={{ fontSize: 40, color: "#e50914", mb: 2 }} />
                <Typography
                  variant="h4"
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
                  Xác nhận đặt vé
                </Typography>
              </Box>
            </motion.div>

            <Divider sx={{ my: 3, borderColor: "rgba(229, 9, 20, 0.3)" }} />

            {/* Thông tin phim */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MovieIcon sx={{ mr: 1 }} />
                  Thông tin phim
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <Box
                          component="img"
                          src={movieInfo?.imageUrl || "/images/movies/default-movie.jpg"}
                          alt={movieInfo?.title}
                          sx={{
                            width: "100%",
                            borderRadius: 3,
                            boxShadow: "0 6px 20px rgba(229, 9, 20, 0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 10px 30px rgba(229, 9, 20, 0.5)",
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} md={8}>
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
                          textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                        }}
                      >
                        {movieInfo?.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                        {movieInfo?.genres?.map((genre) => (
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
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 500,
                          color: "rgba(255, 255, 255, 0.8)",
                          textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                          mb: 2,
                        }}
                      >
                        {movieInfo?.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 500,
                          color: "#fff",
                          textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                        }}
                      >
                        Thời lượng: {movieInfo?.duration} phút
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </motion.div>

            {/* Thông tin suất chiếu */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TheatersIcon sx={{ mr: 1 }} />
                  Thông tin suất chiếu
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon sx={{ mr: 1, color: "#e50914" }} />
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                        {formatDateTime(showTime?.startTime)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TheatersIcon sx={{ mr: 1, color: "#e50914" }} />
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                        Phòng: {showTime?.room}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </motion.div>

            {/* Ghế đã chọn */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EventSeatIcon sx={{ mr: 1 }} />
                  Ghế đã chọn
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <Grid container spacing={1}>
                    {selectedSeats?.map((seat) => (
                      <Grid item key={seat.id}>
                        <Chip
                          label={`Ghế ${seat.number}`}
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
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            </motion.div>

            {/* Thông tin thanh toán */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PaymentIcon sx={{ mr: 1 }} />
                  Thông tin thanh toán
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <Stack spacing={2} sx={{ color: "#fff" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        Giá vé:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        {showTime?.price?.toLocaleString()}đ/vé
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        Số lượng:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        {selectedSeats?.length} vé
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        Tổng tiền gốc:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                        {totalPrice?.toLocaleString()}đ
                      </Typography>
                    </Box>
                    {promotion && (
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          Giảm giá ({promotion.discount}%):
                        </Typography>
                        <Typography sx={{ color: "#e50914", fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          -{(totalPrice * (promotion.discount / 100)).toLocaleString()}đ
                        </Typography>
                      </Box>
                    )}
                    <Divider sx={{ borderColor: "rgba(229, 9, 20, 0.3)" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 800 }}
                      >
                        Thành tiền:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 800,
                          color: "#e50914",
                          textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                        }}
                      >
                        {calculateFinalPrice().toLocaleString()}đ
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </motion.div>

            {/* Mã giảm giá */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalOfferIcon sx={{ mr: 1 }} />
                  Mã giảm giá
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Nhập mã giảm giá"
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 500,
                          color: "#fff",
                        },
                        "& .MuiInputBase-root": {
                          background: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(229, 9, 20, 0.3)",
                        },
                        "& .MuiInputBase-root:hover": {
                          borderColor: "#e50914",
                        },
                        "& .MuiInputBase-root.Mui-focused": {
                          borderColor: "#e50914",
                          boxShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                      }}
                    />
                    <MotionButton
                      variant="contained"
                      onClick={checkPromoCode}
                      sx={{
                        px: 4,
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
                      Áp dụng
                    </MotionButton>
                  </Box>
                  {promoError && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: 1,
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 500,
                        background: "rgba(229, 9, 20, 0.2)",
                        color: "#fff",
                        "& .MuiAlert-icon": { color: "#e50914" },
                      }}
                    >
                      {promoError}
                    </Alert>
                  )}
                  {promotion && (
                    <Alert
                      severity="success"
                      sx={{
                        mt: 1,
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 500,
                        background: "rgba(229, 9, 20, 0.2)",
                        color: "#fff",
                        "& .MuiAlert-icon": { color: "#e50914" },
                      }}
                    >
                      Đã áp dụng mã giảm giá {promotion.discount}%
                    </Alert>
                  )}
                </Paper>
              </Box>
            </motion.div>

            {/* Phương thức thanh toán */}
            <motion.div variants={childVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PaymentIcon sx={{ mr: 1 }} />
                  Phương thức thanh toán
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
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
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="CASH"
                        control={<Radio sx={{ color: "#e50914", "&.Mui-checked": { color: "#e50914" } }} />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              component="img"
                              src={paymentIcons.CASH}
                              alt="Cash"
                              sx={{
                                width: 30,
                                height: 30,
                                mr: 1,
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 5px rgba(229, 9, 20, 0.5))",
                              }}
                            />
                            <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                              Tiền mặt
                            </Typography>
                          </Box>
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="CREDIT_CARD"
                        control={<Radio sx={{ color: "#e50914", "&.Mui-checked": { color: "#e50914" } }} />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              component="img"
                              src={paymentIcons.CREDIT_CARD}
                              alt="Credit Card"
                              sx={{
                                width: 30,
                                height: 30,
                                mr: 1,
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 5px rgba(229, 9, 20, 0.5))",
                              }}
                            />
                            <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                              Thẻ tín dụng
                            </Typography>
                          </Box>
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="PAYPAL"
                        control={<Radio sx={{ color: "#e50914", "&.Mui-checked": { color: "#e50914" } }} />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              component="img"
                              src={paymentIcons.PAYPAL}
                              alt="PayPal"
                              sx={{
                                width: 30,
                                height: 30,
                                mr: 1,
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 5px rgba(229, 9, 20, 0.5))",
                              }}
                            />
                            <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, color: "#fff" }}>
                              PayPal
                            </Typography>
                          </Box>
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Box>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={childVariants}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <MotionButton
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(-1)}
                  sx={{
                    flex: 1,
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
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Quay lại
                </MotionButton>
                <MotionButton
                  variant="contained"
                  size="large"
                  onClick={handleBooking}
                  sx={{
                    flex: 2,
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
                  Xác nhận đặt vé
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

export default BookingConfirmation;