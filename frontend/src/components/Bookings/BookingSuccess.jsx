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

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
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
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "linear-gradient(to bottom, #141414, #1f1f1f)",
            color: "white",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
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
                fontWeight: "bold",
                color: "#4CAF50",
                mb: 1,
              }}
            >
              Đặt vé thành công!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#9e9e9e" }}>
              Cảm ơn bạn đã đặt vé tại Rạp phim LGTV
            </Typography>
          </Box>

          <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.1)" }} />

          {booking && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <MovieIcon sx={{ mr: 2, color: "#e50914" }} />
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    {booking.showTime?.movie?.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    mb: 3,
                    ml: 5,
                  }}
                >
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
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: "#e50914" }} />
                    <Typography variant="body1">
                      Suất chiếu:{" "}
                      {new Date(booking.showTime?.startTime).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <MeetingRoomIcon sx={{ mr: 1, color: "#e50914" }} />
                    <Typography variant="body1">
                      Phòng: {booking.showTime?.room}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EventSeatIcon sx={{ mr: 1, color: "#e50914" }} />
                    <Typography variant="body1">
                      Ghế:{" "}
                      {booking.seats?.map((seat) => seat.number).join(", ")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ConfirmationNumberIcon sx={{ mr: 1, color: "#e50914" }} />
                    <Typography variant="h6">
                      Tổng tiền: {booking.totalPrice.toLocaleString()}đ
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                        label={getPaymentMethodLabel(
                          booking.payments?.[0]?.method
                        )}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor:
                            booking.payments?.[0]?.method === "CASH"
                              ? "rgba(102, 187, 106, 0.8)"
                              : booking.payments?.[0]?.method === "PAYPAL"
                              ? "rgba(33, 150, 243, 0.8)"
                              : booking.payments?.[0]?.method === "CREDIT_CARD"
                              ? "rgba(156, 39, 176, 0.8)"
                              : "rgba(158, 158, 158, 0.8)",
                          color: "white",
                          "& .MuiChip-label": {
                            fontWeight: 500,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {booking.promotion && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalOfferIcon sx={{ mr: 1, color: "#4CAF50" }} />
                      <Typography variant="body1" sx={{ color: "#4CAF50" }}>
                        Đã áp dụng mã giảm giá: {booking.promotion.code}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              to="/bookings"
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
                px: 4,
                py: 1.5,
              }}
              startIcon={<ConfirmationNumberIcon />}
            >
              Xem lịch sử đặt vé
            </Button>
            <Button
              component={Link}
              to="/movies"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#e50914",
                  color: "#e50914",
                },
                px: 4,
                py: 1.5,
              }}
              startIcon={<MovieIcon />}
            >
              Tiếp tục đặt vé
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingSuccess;
