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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

        <Stack sx={{ backgroundColor: "#f5f5f5" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#e50914", fontWeight: "bold" }}
            >
              Quản Lý Suất Chiếu
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
              }}
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
            >
              Thêm Suất Chiếu
            </Button>
          </Box>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phim</TableCell>
                <TableCell>Thời gian bắt đầu</TableCell>
                <TableCell>Thời gian kết thúc</TableCell>
                <TableCell>Phòng</TableCell>
                <TableCell>Giá vé</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showtimes.map((showtime) => (
                <TableRow key={showtime.id}>
                  <TableCell>{showtime.movie?.title}</TableCell>
                  <TableCell>
                    {moment(showtime.startTime).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>
                    {moment(showtime.endTime).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>{showtime.room}</TableCell>
                  <TableCell>{formatCurrency(showtime.price)}</TableCell>
                  <TableCell>
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
                      sx={{ color: "#e50914" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(showtime.id)}
                      sx={{ color: "#e50914" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editShowtime ? "Chỉnh Sửa Suất Chiếu" : "Thêm Suất Chiếu Mới"}
          </DialogTitle>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Phim"
              value={formData.movieId}
              onChange={(e) =>
                setFormData({ ...formData, movieId: parseInt(e.target.value) })
              }
              margin="normal"
            >
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Thời gian bắt đầu"
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Thời gian kết thúc"
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Phòng"
              value={formData.room}
              onChange={(e) =>
                setFormData({ ...formData, room: e.target.value })
              }
              margin="normal"
            />

            <TextField
              fullWidth
              label="Giá vé"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
              }}
            >
              {editShowtime ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Stack>
  );
};

export default AdminShowtimes;
