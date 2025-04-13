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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  MenuItem,
  IconButton,
  Alert,
  TablePagination,
  Tooltip,
  CircularProgress,
  Fade,
  useTheme,
  Grid,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TheatersIcon from "@mui/icons-material/Theaters";
import moment from "moment";

const AdminShowtimes = () => {
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(5);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    movieId: "",
    startTime: moment().format("YYYY-MM-DDTHH:mm"),
    endTime: moment().add(2, "hours").format("YYYY-MM-DDTHH:mm"),
    room: "",
    price: "",
  });
  const [editShowtime, setEditShowtime] = useState(null);

  const fetchShowtimes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/showtimes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể tải danh sách suất chiếu");
      }

      const data = await response.json();
      setShowtimes(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMovies(data.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchShowtimes();
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editShowtime
        ? `http://localhost:5000/api/showtimes/${editShowtime.id}`
        : "http://localhost:5000/api/showtimes";

      const requestData = {
        ...formData,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      const response = await fetch(url, {
        method: editShowtime ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Thao tác không thành công");
      }

      setOpen(false);
      fetchShowtimes();
      setFormData({
        movieId: "",
        startTime: moment().format("YYYY-MM-DDTHH:mm"),
        endTime: moment().add(2, "hours").format("YYYY-MM-DDTHH:mm"),
        room: "",
        price: "",
      });
      setEditShowtime(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa suất chiếu này?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/showtimes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Không thể xóa suất chiếu");

      fetchShowtimes();
    } catch (err) {
      setError(err.message);
    }
  };

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

        {/* Header and Add Button */}
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
            Quản lý Suất Chiếu
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditShowtime(null);
              setFormData({
                movieId: "",
                startTime: moment().format("YYYY-MM-DDTHH:mm"),
                endTime: moment().add(2, "hours").format("YYYY-MM-DDTHH:mm"),
                room: "",
                price: "",
              });
              setOpen(true);
            }}
            sx={{
              backgroundColor: "#e50914",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Thêm Suất Chiếu
          </Button>
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

        {/* Showtimes Table */}
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
                  Phim
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Thời gian bắt đầu
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Thời gian kết thúc
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Phòng
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Giá vé
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
              {showtimes.map((showtime) => (
                <TableRow
                  key={showtime.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <TheatersIcon sx={{ color: "#1976d2" }} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "#1a237e",
                        }}
                      >
                        {showtime.movie?.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={moment(showtime.startTime).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                      sx={{
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        color: "#1976d2",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={moment(showtime.endTime).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                      sx={{
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        color: "#1976d2",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`Phòng ${showtime.room}`}
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        color: "#4caf50",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: "#e50914",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(showtime.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        onClick={() => {
                          setEditShowtime(showtime);
                          setFormData({
                            movieId: showtime.movieId,
                            startTime: moment(showtime.startTime).format(
                              "YYYY-MM-DDTHH:mm"
                            ),
                            endTime: moment(showtime.endTime).format(
                              "YYYY-MM-DDTHH:mm"
                            ),
                            room: showtime.room,
                            price: showtime.price,
                          });
                          setOpen(true);
                        }}
                        sx={{
                          color: "#1976d2",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa" arrow>
                      <IconButton
                        onClick={() => handleDelete(showtime.id)}
                        sx={{
                          color: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Showtime Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
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
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a237e",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              pb: 2,
            }}
          >
            {editShowtime ? "Chỉnh sửa Suất Chiếu" : "Thêm Suất Chiếu"}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Phim"
                  value={formData.movieId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      movieId: parseInt(e.target.value),
                    })
                  }
                  required
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Thời gian bắt đầu"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Thời gian kết thúc"
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phòng"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá vé"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                  InputProps={{
                    startAdornment: "₫",
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              {editShowtime ? "Lưu thay đổi" : "Thêm suất chiếu"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminShowtimes;
