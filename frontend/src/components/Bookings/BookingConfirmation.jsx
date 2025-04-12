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
  FormLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MovieIcon from "@mui/icons-material/Movie";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showTimeId, selectedSeats, showTime, movieInfo, totalPrice } =
    location.state || {};

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
      // Log để debug
      console.log("Selected seats:", selectedSeats);

      const bookingData = {
        showTimeId: showTime.id,
        seatNumbers: selectedSeats.map((seat) => seat.number),
        promotionCode: promoCode || null,
        paymentMethod: paymentMethod,
      };

      console.log("Sending booking data:", bookingData);

      const response = await fetch(
        "http://localhost:5000/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể đặt vé");
      }

      const data = await response.json();
      console.log("Booking response:", data);

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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Tiêu đề */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <MovieIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Xác nhận đặt vé
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin phim */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MovieIcon sx={{ mr: 1 }} />
            Thông tin phim
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <img
                  src={
                    movieInfo?.imageUrl || "/images/movies/default-movie.jpg"
                  }
                  alt={movieInfo?.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  {movieInfo?.title}
                </Typography>

                {/* Thêm phần hiển thị thể loại */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  {movieInfo?.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#bbdefb",
                        },
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {movieInfo?.description}
                </Typography>
                <Typography variant="body2">
                  Thời lượng: {movieInfo?.duration} phút
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Thông tin suất chiếu */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TheatersIcon sx={{ mr: 1 }} />
            Thông tin suất chiếu
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography>{formatDateTime(showTime?.startTime)}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TheatersIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography>Phòng: {showTime?.room}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* Ghế đã chọn */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EventSeatIcon sx={{ mr: 1 }} />
            Ghế đã chọn
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Grid container spacing={1}>
              {selectedSeats?.map((seat) => (
                <Grid item key={seat.id}>
                  <Chip
                    label={`Ghế ${seat.number}`}
                    color="primary"
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Thông tin thanh toán */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
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
              borderRadius: 2,
              background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
              color: "white",
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Giá vé:</Typography>
                <Typography>{showTime?.price?.toLocaleString()}đ/vé</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Số lượng:</Typography>
                <Typography>{selectedSeats?.length} vé</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Tổng tiền gốc:</Typography>
                <Typography>{totalPrice?.toLocaleString()}đ</Typography>
              </Box>
              {promotion && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Giảm giá ({promotion.discount}%):</Typography>
                  <Typography color="error">
                    -
                    {(totalPrice * (promotion.discount / 100)).toLocaleString()}
                    đ
                  </Typography>
                </Box>
              )}
              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Thành tiền:</Typography>
                <Typography variant="h6">
                  {calculateFinalPrice().toLocaleString()}đ
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* Mã giảm giá */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalOfferIcon sx={{ mr: 1 }} />
            Mã giảm giá
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Nhập mã giảm giá"
              />
              <Button variant="contained" onClick={checkPromoCode}>
                Áp dụng
              </Button>
            </Box>
            {promoError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {promoError}
              </Alert>
            )}
            {promotion && (
              <Alert severity="success" sx={{ mt: 1 }}>
                Đã áp dụng mã giảm giá {promotion.discount}%
              </Alert>
            )}
          </Paper>
        </Box>

        {/* Thêm phần chọn phương thức thanh toán */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PaymentIcon sx={{ mr: 1 }} />
            Phương thức thanh toán
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="CASH"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={paymentIcons.CASH}
                        alt="Cash"
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "contain",
                        }}
                      />
                      <Typography>Tiền mặt</Typography>
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
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={paymentIcons.CREDIT_CARD}
                        alt="Credit Card"
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "contain",
                        }}
                      />
                      <Typography>Thẻ tín dụng</Typography>
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
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={paymentIcons.PAYPAL}
                        alt="PayPal"
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "contain",
                        }}
                      />
                      <Typography>PayPal</Typography>
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

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            sx={{ flex: 1 }}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleBooking}
            sx={{
              flex: 2,
              background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976d2 30%, #1ba9d2 90%)",
              },
            }}
          >
            Xác nhận đặt vé
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation;
