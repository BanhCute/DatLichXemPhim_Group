import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
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
      console.log("Using token:", token); // Debug log

      if (!token) {
        throw new Error("Vui lòng đăng nhập");
      }

      const response = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Debug log

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

  // Thêm hàm để chuyển đổi payment method thành text tiếng Việt
  const getPaymentMethodLabel = (booking) => {
    // Nếu có payment thì lấy method từ payment
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
    // Nếu không có payment thì mặc định là CASH
    return "Tiền mặt";
  };

  // Thêm object chứa đường dẫn hình ảnh
  const paymentIcons = {
    CASH: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    CREDIT_CARD: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    PAYPAL: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress sx={{ color: "#e50914" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minHeight: "90vh",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              background: "linear-gradient(to right, #141414, #1f1f1f)",
              color: "white",
              borderRadius: 2,
            }}
          >
            <TheatersIcon sx={{ fontSize: 60, color: "#e50914", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Bạn chưa có đơn đặt vé nào
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#9e9e9e" }}>
              Hãy đặt vé để thưởng thức những bộ phim hấp dẫn
            </Typography>
            <Button
              variant="contained"
              href="/movies"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
                px: 4,
                py: 1.5,
              }}
            >
              Đặt vé ngay
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "90vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <LocalActivityIcon
            sx={{
              fontSize: 40,
              color: "#e50914",
              mr: 2,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#141414",
            }}
          >
            Lịch sử đặt vé
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Card
                elevation={3}
                sx={{
                  display: "flex",
                  background:
                    "linear-gradient(135deg, #141414 0%, #1f1f1f 100%)",
                  color: "white",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: 120, sm: 200 },
                    height: "100%",
                    objectFit: "cover",
                  }}
                  image={
                    booking.showTime?.movie?.imageUrl || "/default-movie.jpg"
                  }
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
                        sx={{ fontWeight: "bold", mb: 1 }}
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
                              backgroundColor: "#e50914",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#b81d24",
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
                        backgroundColor:
                          booking.status === "PENDING"
                            ? "#ffa726"
                            : booking.status === "CONFIRMED"
                            ? "#66bb6a"
                            : "#ef5350",
                        color: "white",
                        fontWeight: "bold",
                        px: 2,
                      }}
                    />
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderRadius: 1,
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <AccessTimeIcon sx={{ mr: 1, color: "#e50914" }} />
                          <Typography>
                            {dayjs(booking.showTime?.startTime).format(
                              "HH:mm - DD/MM/YYYY"
                            )}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EventSeatIcon sx={{ mr: 1, color: "#e50914" }} />
                          <Typography>
                            Ghế:{" "}
                            {booking.seats
                              ?.map((seat) => seat.number)
                              .join(", ")}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderRadius: 1,
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <MovieIcon sx={{ mr: 1, color: "#e50914" }} />
                          <Typography>
                            Phòng: {booking.showTime?.room}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PaymentIcon sx={{ mr: 1, color: "#e50914" }} />
                          <Typography variant="h6" sx={{ fontWeight: "500" }}>
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
                          backgroundColor: "#4caf50",
                          color: "white",
                          fontWeight: "500",
                        }}
                      />
                    </Box>
                  )}

                  {/* Thêm phần hiển thị phương thức thanh toán */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 1,
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img
                        src={
                          paymentIcons[booking.payments?.[0]?.method] ||
                          paymentIcons.CASH
                        }
                        alt="Payment method"
                        style={{
                          width: 24,
                          height: 24,
                          objectFit: "contain",
                        }}
                      />
                      <Typography sx={{ color: "white" }}>
                        Thanh toán qua:
                      </Typography>
                      <Chip
                        label={getPaymentMethodLabel(booking)}
                        size="small"
                        sx={{ ml: 1 }}
                        color={
                          !booking.payments || !booking.payments[0]
                            ? "success"
                            : booking.payments[0].method === "PAYPAL"
                            ? "primary"
                            : booking.payments[0].method === "CREDIT_CARD"
                            ? "info"
                            : "success"
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingHistory;