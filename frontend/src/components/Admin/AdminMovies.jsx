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
  Stack,
  TablePagination,
  Tooltip,
  CircularProgress,
  Fade,
  useTheme,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            Quản lý Phim
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
              setSelectedGenres([]);
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
            Thêm Phim Mới
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

        {/* Movies Table */}
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
                  Hình ảnh
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Tên Phim
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Thời lượng
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#37474f",
                    fontSize: "1rem",
                  }}
                >
                  Thể loại
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
              {movies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow
                    key={movie.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        component="img"
                        src={
                          movie.imageUrl.startsWith("http")
                            ? movie.imageUrl
                            : movie.imageUrl.startsWith("/")
                            ? movie.imageUrl // Lấy trực tiếp từ public folder
                            : `/${movie.imageUrl}`
                        }
                        alt={movie.title}
                        sx={{
                          width: 60,
                          height: 90,
                          objectFit: "cover",
                          borderRadius: 1,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                        onError={(e) => {
                          console.error("Image load error:", e);
                          e.target.src = "/images/movies/default.jpg"; // Fallback image
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "#1a237e",
                        }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {movie.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{movie.duration} phút</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {movie.genres.map((genre) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                              color: "#1976d2",
                              fontWeight: 600,
                              my: 0.5,
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Chỉnh sửa" arrow>
                        <IconButton
                          onClick={() => {
                            setEditMovie(movie);
                            setFormData({
                              title: movie.title,
                              description: movie.description,
                              duration: movie.duration.toString(),
                              imageUrl: movie.imageUrl,
                            });
                            setSelectedGenres(movie.genres.map((g) => g.id));
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
                          onClick={() => handleDelete(movie.id)}
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
          <TablePagination
            component="div"
            count={movies.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} của ${count}`
            }
            sx={{
              ".MuiTablePagination-select": {
                fontWeight: 600,
              },
              ".MuiTablePagination-displayedRows": {
                fontWeight: 600,
              },
            }}
          />
        </TableContainer>

        {/* Add/Edit Movie Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
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
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a237e",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              pb: 2,
            }}
          >
            {editMovie ? "Chỉnh sửa Phim" : "Thêm Phim Mới"}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên phim"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1976d2",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Thời lượng (phút)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Thể loại</InputLabel>
                    <Select
                      multiple
                      value={selectedGenres}
                      onChange={handleGenreChange}
                      input={<OutlinedInput label="Thể loại" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => {
                            const genre = genres.find((g) => g.id === value);
                            return (
                              <Chip
                                key={value}
                                label={genre ? genre.name : ""}
                                sx={{
                                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                                  color: "#1976d2",
                                  fontWeight: 600,
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
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      p: 3,
                      border: "2px dashed rgba(0,0,0,0.12)",
                      borderRadius: 2,
                    }}
                  >
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
                      Tải lên hình ảnh
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*"
                      />
                    </Button>
                    {(imagePreview || formData.imageUrl) && (
                      <Box
                        component="img"
                        src={
                          imagePreview ||
                          (formData.imageUrl?.startsWith("http")
                            ? formData.imageUrl
                            : formData.imageUrl?.startsWith("/")
                            ? formData.imageUrl // Lấy trực tiếp từ public folder
                            : `/${formData.imageUrl}`)
                        }
                        alt="Preview"
                        sx={{
                          width: 200,
                          height: 300,
                          objectFit: "cover",
                          borderRadius: 2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        onError={(e) => {
                          console.error("Image load error:", e);
                          e.target.src = "/images/movies/default.jpg"; // Fallback image
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
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
              {editMovie ? "Lưu thay đổi" : "Thêm phim"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminMovies;
