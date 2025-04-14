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
  Alert,
  TablePagination,
  Tooltip,
  CircularProgress,
  Fade,
  useTheme,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Admin Navigation */}
        <Paper
          elevation={24}
          sx={{
            mb: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #e50914, #ff5722, #ff9800)",
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                color: "#37474f",
                textTransform: "none",
                fontSize: "1rem",
                padding: "16px 32px",
                transition: "all 0.3s ease",
                minHeight: "72px",
                "&:hover": {
                  color: "#e50914",
                  backgroundColor: "rgba(229, 9, 20, 0.08)",
                },
                "&.Mui-selected": {
                  color: "#e50914",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e50914",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              label="Dashboard"
              icon={<DashboardIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Phim"
              icon={<MovieIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Thể Loại"
              icon={<CategoryIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Người Dùng"
              icon={<PeopleIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Đặt Vé"
              icon={<ReceiptIcon />}
              iconPosition="start"
            />
            <Tab
              label="Quản lý Suất Chiếu"
              icon={<ShowChartIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Quản lý Đặt Vé
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              color: "#d32f2f",
              "& .MuiAlert-icon": {
                color: "#d32f2f",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : (
          /* Bookings Table */
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Người đặt
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Phim
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Suất chiếu
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Ghế
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Tổng tiền
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Khuyến mãi
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Phương thức
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Ngày đặt
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: "#37474f",
                      fontSize: "1rem",
                    }}
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <TableCell>#{booking.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#1976d2",
                            width: 32,
                            height: 32,
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#1a237e",
                          }}
                        >
                          {booking.userId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocalMoviesIcon sx={{ color: "#1976d2" }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#1a237e",
                          }}
                        >
                          {booking.showTime?.movie?.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={moment(booking.showTime?.startTime).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                          color: "#1976d2",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {booking.seats.map((seat) => (
                          <Chip
                            key={seat.id}
                            icon={<EventSeatIcon />}
                            label={seat.number}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(76, 175, 80, 0.1)",
                              color: "#4caf50",
                              "& .MuiChip-icon": {
                                color: "#4caf50",
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: "#e50914",
                          fontWeight: 600,
                        }}
                      >
                        {formatCurrency(booking.totalPrice)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {booking.promotion ? (
                        <Chip
                          label={`-${booking.promotion.discount}%`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(156, 39, 176, 0.1)",
                            color: "#9c27b0",
                          }}
                        />
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Không có
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<PaymentIcon />}
                        label={getPaymentMethodLabel(
                          booking.payments?.[0]?.method
                        )}
                        size="small"
                        sx={{
                          backgroundColor:
                            booking.payments?.[0]?.method === "CASH"
                              ? "rgba(76, 175, 80, 0.1)"
                              : booking.payments?.[0]?.method === "PAYPAL"
                              ? "rgba(25, 118, 210, 0.1)"
                              : booking.payments?.[0]?.method === "CREDIT_CARD"
                              ? "rgba(255, 152, 0, 0.1)"
                              : "rgba(158, 158, 158, 0.1)",
                          color:
                            booking.payments?.[0]?.method === "CASH"
                              ? "#4caf50"
                              : booking.payments?.[0]?.method === "PAYPAL"
                              ? "#1976d2"
                              : booking.payments?.[0]?.method === "CREDIT_CARD"
                              ? "#ff9800"
                              : "#9e9e9e",
                          "& .MuiChip-icon": {
                            color: "inherit",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            booking.status === "CONFIRMED"
                              ? "rgba(76, 175, 80, 0.1)"
                              : "rgba(255, 152, 0, 0.1)",
                          color:
                            booking.status === "CONFIRMED"
                              ? "#4caf50"
                              : "#ff9800",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {moment(booking.createdAt).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Xem chi tiết" arrow>
                        <IconButton
                          onClick={() => handleOpenDetail(booking.id)}
                          sx={{
                            color: "#1976d2",
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Booking Detail Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedBooking(null);
          }}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#1a237e",
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ReceiptIcon />
            Chi tiết đơn đặt vé #{selectedBooking?.id}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LocalMoviesIcon />
                  Thông tin phim
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(25, 118, 210, 0.05)",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Tên phim:</strong>{" "}
                    {selectedBooking?.showTime?.movie?.title}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Thời lượng:</strong>{" "}
                    {selectedBooking?.showTime?.movie?.duration} phút
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ShowChartIcon />
                  Thông tin suất chiếu
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(76, 175, 80, 0.05)",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Thời gian:</strong>{" "}
                    {moment(selectedBooking?.showTime?.startTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phòng:</strong> {selectedBooking?.showTime?.room}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EventSeatIcon />
                  Thông tin ghế
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(156, 39, 176, 0.05)",
                  }}
                >
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {selectedBooking?.seats.map((seat) => (
                      <Chip
                        key={seat.id}
                        icon={<EventSeatIcon />}
                        label={seat.number}
                        sx={{
                          backgroundColor: "rgba(76, 175, 80, 0.1)",
                          color: "#4caf50",
                          "& .MuiChip-icon": {
                            color: "#4caf50",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PaymentIcon />
                  Thông tin thanh toán
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 152, 0, 0.05)",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {getPaymentMethodLabel(
                      selectedBooking?.payments?.[0]?.method
                    )}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Giá vé:</strong>{" "}
                    {formatCurrency(selectedBooking?.showTime?.price)} / ghế
                  </Typography>
                  {selectedBooking?.promotion && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Khuyến mãi:</strong>{" "}
                      {selectedBooking.promotion.code} (-
                      {selectedBooking.promotion.discount}%)
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#e50914",
                      fontWeight: 600,
                    }}
                  >
                    <strong>Tổng tiền:</strong>{" "}
                    {formatCurrency(selectedBooking?.totalPrice)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ReceiptIcon />
                  Thông tin khác
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(33, 33, 33, 0.05)",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Trạng thái:</strong>{" "}
                    <Chip
                      label={selectedBooking?.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          selectedBooking?.status === "CONFIRMED"
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(255, 152, 0, 0.1)",
                        color:
                          selectedBooking?.status === "CONFIRMED"
                            ? "#4caf50"
                            : "#ff9800",
                      }}
                    />
                  </Typography>
                  <Typography variant="body1">
                    <strong>Thời gian đặt:</strong>{" "}
                    {moment(selectedBooking?.createdAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminBookings;
