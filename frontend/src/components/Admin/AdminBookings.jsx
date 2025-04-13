import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(4);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể tải danh sách đặt vé");
      }

      const data = await response.json();
      setBookings(data.data);
      setError("");
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleTabChange = (event, newValue) => {
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
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleOpenDetail = async (bookingId) => {
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
      console.log("Booking data:", data.data);
      setSelectedBooking(data.data);
      setOpenDialog(true);
    } catch (err) {
      setError(err.message);
    }
  };

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

  const BookingDetailDialog = ({ booking, open, onClose }) => {
    if (!booking) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#141414", color: "#fff" }}>
          Chi tiết đơn đặt vé #{booking.id}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#e50914", fontWeight: "bold" }}
              >
                Thông tin phim
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography>
                  <strong>Tên phim:</strong> {booking.showTime?.movie?.title}
                </Typography>
                <Typography>
                  <strong>Thời lượng:</strong>{" "}
                  {booking.showTime?.movie?.duration} phút
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#e50914", fontWeight: "bold" }}
              >
                Thông tin suất chiếu
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography>
                  <strong>Thời gian:</strong>{" "}
                  {moment(booking.showTime?.startTime).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </Typography>
                <Typography>
                  <strong>Phòng:</strong> {booking.showTime?.room}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#e50914", fontWeight: "bold" }}
              >
                Thông tin ghế
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {booking.seats.map((seat) => (
                  <Chip
                    key={seat.id}
                    label={seat.number}
                    sx={{ backgroundColor: "#e50914", color: "white" }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#e50914", fontWeight: "bold" }}
              >
                Thông tin thanh toán
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {getPaymentMethodLabel(booking.payments?.[0]?.method)}
                </Typography>
                <Typography>
                  <strong>Giá vé:</strong>{" "}
                  {formatCurrency(booking.showTime?.price)} / ghế
                </Typography>
                {booking.promotion && (
                  <Typography>
                    <strong>Khuyến mãi:</strong> {booking.promotion.code} (-
                    {booking.promotion.discount}%)
                  </Typography>
                )}
                <Typography>
                  <strong>Tổng tiền:</strong>{" "}
                  {formatCurrency(booking.totalPrice)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#e50914", fontWeight: "bold" }}
              >
                Thông tin khác
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography>
                  <strong>Trạng thái:</strong> {booking.status}
                </Typography>
                <Typography>
                  <strong>Thời gian đặt:</strong>{" "}
                  {moment(booking.createdAt).format("DD/MM/YYYY HH:mm")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Stack
      sx={{
        background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)",
        height: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                color: "#666",
                "&.Mui-selected": {
                  color: "#e50914",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e50914",
              },
            }}
          >
            <Tab label="DASHBOARD" />
            <Tab label="QUẢN LÝ PHIM" />
            <Tab label="QUẢN LÝ THỂ LOẠI" />
            <Tab label="QUẢN LÝ NGƯỜI DÙNG" />
            <Tab label="QUẢN LÝ ĐẶT VÉ" />
            <Tab label="QUẢN LÝ SUẤT CHIẾU" />
          </Tabs>
        </Paper>

        <Stack
        sx={{
          backgroundColor: "#f5f5f5" 
        }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#e50914", fontWeight: "bold" }}
            >
              Quản Lý Đặt Vé
            </Typography>
          </Box>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Người đặt</TableCell>
                  <TableCell>Phim</TableCell>
                  <TableCell>Suất chiếu</TableCell>
                  <TableCell>Ghế</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Khuyến mãi</TableCell>
                  <TableCell>Phương thức</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.userId}</TableCell>
                    <TableCell>{booking.showTime?.movie?.title}</TableCell>
                    <TableCell>
                      {moment(booking.showTime?.startTime).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {booking.seats.map((seat) => (
                          <Chip
                            key={seat.id}
                            label={seat.number}
                            size="small"
                            sx={{ backgroundColor: "#e50914", color: "white" }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>{formatCurrency(booking.totalPrice)}</TableCell>
                    <TableCell>
                      {booking.promotion ? (
                        <Chip
                          label={`-${booking.promotion.discount}%`}
                          color="success"
                          size="small"
                        />
                      ) : (
                        "Không có"
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getPaymentMethodLabel(
                          booking.payments?.[0]?.method
                        )}
                        color={
                          booking.payments?.[0]?.method === "CASH"
                            ? "success"
                            : booking.payments?.[0]?.method === "PAYPAL"
                            ? "primary"
                            : booking.payments?.[0]?.method === "CREDIT_CARD"
                            ? "info"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={
                          booking.status === "CONFIRMED" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {moment(booking.createdAt).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDetail(booking.id)}
                        sx={{
                          color: "#e50914",
                          "&:hover": {
                            backgroundColor: "rgba(229, 9, 20, 0.1)",
                          },
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <BookingDetailDialog
          booking={selectedBooking}
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedBooking(null);
          }}
        />
      </Container>
    </Stack>
  );
};

export default AdminBookings;
