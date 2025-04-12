import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/genres", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setGenres(data.data);
    } catch (err) {
      console.error("Error fetching genres:", err);
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
      setError("Không thể tải danh sách phim");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Upload hình ảnh trước nếu có file được chọn
      let imageUrl = formData.imageUrl;
      if (selectedFile) {
        const formDataImage = new FormData();
        formDataImage.append("image", selectedFile);

        const uploadResponse = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataImage,
        });

        if (!uploadResponse.ok) {
          throw new Error("Không thể upload hình ảnh");
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.data.path; // Lấy đường dẫn ảnh từ response
      }

      // Chuẩn bị dữ liệu phim
      const movieData = {
        ...formData,
        imageUrl, // Sử dụng đường dẫn ảnh mới nếu có upload, không thì giữ nguyên
        genres: selectedGenres,
      };

      // Gọi API tạo/cập nhật phim
      const url = editMovie
        ? `http://localhost:5000/api/movies/${editMovie.id}`
        : "http://localhost:5000/api/movies";

      const response = await fetch(url, {
        method: editMovie ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Có lỗi xảy ra");
      }

      // Đóng dialog và refresh danh sách phim
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        duration: "",
        imageUrl: "",
      });
      setSelectedGenres([]);
      setSelectedFile(null);
      setImagePreview("");
      fetchMovies();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json(); // Đọc response body

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Không thể xóa phim. Phim có thể đang có suất chiếu hoặc đánh giá."
        );
      }

      await fetchMovies();
      setError(""); // Xóa thông báo lỗi nếu thành công
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Không thể xóa phim. Vui lòng thử lại sau.");
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

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(typeof value === "string" ? value.split(",") : value);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Tạo preview URL cho ảnh
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    if (editMovie) {
      setFormData({
        title: editMovie.title,
        description: editMovie.description,
        duration: editMovie.duration.toString(),
        imageUrl: editMovie.imageUrl || "",
      });
      setSelectedGenres(editMovie.genres?.map((genre) => genre.id) || []);
    } else {
      setSelectedGenres([]);
    }
  }, [editMovie]);

  return (
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
          Quản Lý Phim
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditMovie(null);
            setFormData({
              title: "",
              description: "",
              duration: "",
              imageUrl: "",
            });
            setOpen(true);
          }}
          sx={{
            backgroundColor: "#e50914",
            "&:hover": {
              backgroundColor: "#b81d24",
            },
          }}
        >
          Thêm Phim Mới
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Tên Phim</TableCell>
              <TableCell>Thời Lượng</TableCell>
              <TableCell>Thể Loại</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell align="right">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.duration} phút</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {movie.genres?.map((genre) => (
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
                </TableCell>
                <TableCell>
                  {movie.imageUrl && (
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      style={{ height: 50, width: "auto" }}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setEditMovie(movie);
                      setFormData({
                        title: movie.title,
                        description: movie.description,
                        duration: movie.duration.toString(),
                        imageUrl: movie.imageUrl || "",
                      });
                      setOpen(true);
                    }}
                    sx={{ color: "#1976d2" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(movie.id)}
                    sx={{ color: "#d32f2f" }}
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMovie ? "Chỉnh Sửa Phim" : "Thêm Phim Mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên phim"
            fullWidth
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            required
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Thời lượng (phút)"
            fullWidth
            required
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Chọn hình ảnh
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Button>

            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            {formData.imageUrl && !imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={formData.imageUrl}
                  alt="Current"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>
          <FormControl fullWidth margin="dense">
            <InputLabel>Thể loại</InputLabel>
            <Select
              multiple
              value={selectedGenres}
              onChange={handleGenreChange}
              input={<OutlinedInput label="Thể loại" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const genre = genres.find((g) => g.id === value);
                    return (
                      <Chip
                        key={value}
                        label={genre?.name}
                        sx={{
                          backgroundColor: "#e50914",
                          color: "white",
                        }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "#9e9e9e" }}>
            Hủy
          </Button>
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
            {editMovie ? "Cập Nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminMovies;
