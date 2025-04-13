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
  Stack,
  TablePagination,
  Tooltip,
  CircularProgress,
  Fade,
  useTheme,
  Chip,
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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link, useNavigate } from "react-router-dom";

const AdminGenres = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [editGenre, setEditGenre] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(2);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
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
      setError("Không thể tải danh sách thể loại");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editGenre
        ? `http://localhost:5000/api/genres/${editGenre.id}`
        : "http://localhost:5000/api/genres";

      const method = editGenre ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Thao tác không thành công");

      setOpen(false);
      fetchGenres();
      setFormData({ name: "" });
      setEditGenre(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thể loại này?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/genres/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Không thể xóa thể loại");

      fetchGenres();
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
            Quản lý Thể Loại
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditGenre(null);
              setFormData({ name: "" });
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
            Thêm Thể Loại
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

        {/* Genres Table */}
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
              {genres
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((genre) => (
                  <TableRow
                    key={genre.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <LocalOfferIcon
                          sx={{
                            color: "#1976d2",
                            fontSize: "1.5rem",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "#1a237e",
                          }}
                        >
                          {genre.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Chỉnh sửa" arrow>
                        <IconButton
                          onClick={() => {
                            setEditGenre(genre);
                            setFormData({ name: genre.name });
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
                          onClick={() => handleDelete(genre.id)}
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
            count={genres.length}
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

        {/* Add/Edit Genre Dialog */}
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
            {editGenre ? "Chỉnh sửa Thể Loại" : "Thêm Thể Loại"}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="Tên thể loại"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              required
              variant="outlined"
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
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
              {editGenre ? "Lưu thay đổi" : "Thêm thể loại"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminGenres;
